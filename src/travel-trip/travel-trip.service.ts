import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TravelTrip } from './entity/travel-trip.entity';
import { CreateTravelTripRequestDto } from './dto/create-travel-trip-request.dto';
import { UpdateTravelTripRequestDto } from './dto/update-travel-trip-request.dto';
import { TravelTripResponseDto } from './dto/travel-trip-response.dto';
import { UserService } from 'src/user/user.service';
import { TravelPackageService } from 'src/travel-package/travel-package.service';
import { Role } from 'src/user/enum/user-role.enum';

@Injectable()
export class TravelTripService {
  constructor(
    @InjectRepository(TravelTrip)
    private readonly travelTripRepository: Repository<TravelTrip>,
    private readonly userService: UserService,
    private readonly travelPackageService: TravelPackageService,
    private readonly dataSource: DataSource
  ) {}

  async createTravelTrip(dto: CreateTravelTripRequestDto): Promise<TravelTripResponseDto> {
    return await this.dataSource.transaction(async (manager) => {
      const tripRepository = manager.getRepository(TravelTrip);

      const tourist = await this.userService.findUserById(dto.userTouristId);
      if (tourist.role !== Role.TOURIST) {
        throw new ConflictException(`User dengan id ${dto.userTouristId} bukan tourist`);
      }

      const employee = await this.userService.findUserById(dto.userEmployeeId);
      if (employee.role !== Role.EMPLOYEE) {
        throw new ConflictException(`User dengan id ${dto.userEmployeeId} bukan employee`);
      }

      const travelPackage = await this.travelPackageService.getTravelPackageEntity(dto.travelPackageId);

      const startDate = new Date(dto.startDate);
      const endDate = new Date(dto.endDate);

      if (startDate >= endDate) {
        throw new ConflictException('Start date harus lebih awal dari end date');
      }

      const tripDurationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      if (tripDurationDays !== travelPackage.durationDays) {
        throw new ConflictException(
          `Durasi trip (${tripDurationDays} hari) tidak sesuai dengan durasi package (${travelPackage.durationDays} hari)`
        );
      }

      const overlappingTrip = await tripRepository
        .createQueryBuilder('trip')
        .where('trip.user_tourist_id = :touristId', { touristId: dto.userTouristId })
        .andWhere(
          '(trip.start_date BETWEEN :startDate AND :endDate OR trip.end_date BETWEEN :startDate AND :endDate OR (:startDate BETWEEN trip.start_date AND trip.end_date))',
          { startDate, endDate }
        )
        .getOne();

      if (overlappingTrip) {
        throw new ConflictException(
          'Tourist sudah memiliki trip lain di rentang waktu yang sama'
        );
      }

      const trip = tripRepository.create({
        userTourist: tourist,
        userEmployee: employee,
        travelPackage: travelPackage,
        startDate: startDate,
        endDate: endDate,
        notes: dto.notes || null
      });

      const savedTrip = await tripRepository.save(trip);

      savedTrip.userTourist = tourist;
      savedTrip.userEmployee = employee;
      savedTrip.travelPackage = travelPackage;

      return TravelTripResponseDto.fromTravelTrip(savedTrip);
    });
  }

  async findAllTrips(): Promise<TravelTripResponseDto[]> {
    const trips = await this.travelTripRepository.find({
      relations: ['userTourist', 'userEmployee', 'travelPackage'],
      order: {
        createdAt: 'DESC'
      }
    });

    return TravelTripResponseDto.fromTravelTrips(trips);
  }

  async findTripById(id: string): Promise<TravelTripResponseDto> {
    const trip = await this.travelTripRepository.findOne({
      where: { id },
      relations: ['userTourist', 'userEmployee', 'travelPackage']
    });

    if (!trip) {
      throw new NotFoundException(`Trip dengan id ${id} tidak ditemukan`);
    }

    return TravelTripResponseDto.fromTravelTrip(trip);
  }

  async findTripsByTourist(touristId: string): Promise<TravelTripResponseDto[]> {
    await this.userService.findUserById(touristId);

    const trips = await this.travelTripRepository.find({
      where: { userTourist: { id: touristId } },
      relations: ['userTourist', 'userEmployee', 'travelPackage'],
      order: {
        startDate: 'DESC'
      }
    });

    return TravelTripResponseDto.fromTravelTrips(trips);
  }

  async findTripsByEmployee(employeeId: string): Promise<TravelTripResponseDto[]> {
    await this.userService.findUserById(employeeId);

    const trips = await this.travelTripRepository.find({
      where: { userEmployee: { id: employeeId } },
      relations: ['userTourist', 'userEmployee', 'travelPackage'],
      order: {
        startDate: 'DESC'
      }
    });

    return TravelTripResponseDto.fromTravelTrips(trips);
  }

  async findTripsByPackage(packageId: string): Promise<TravelTripResponseDto[]> {
    await this.travelPackageService.getTravelPackageEntity(packageId);

    const trips = await this.travelTripRepository.find({
      where: { travelPackage: { id: packageId } },
      relations: ['userTourist', 'userEmployee', 'travelPackage'],
      order: {
        startDate: 'DESC'
      }
    });

    return TravelTripResponseDto.fromTravelTrips(trips);
  }

  async findUpcomingTrips(): Promise<TravelTripResponseDto[]> {
    const now = new Date();

    const trips = await this.travelTripRepository
      .createQueryBuilder('trip')
      .leftJoinAndSelect('trip.userTourist', 'tourist')
      .leftJoinAndSelect('trip.userEmployee', 'employee')
      .leftJoinAndSelect('trip.travelPackage', 'package')
      .where('trip.start_date > :now', { now })
      .orderBy('trip.start_date', 'ASC')
      .getMany();

    return TravelTripResponseDto.fromTravelTrips(trips);
  }

  async findOngoingTrips(): Promise<TravelTripResponseDto[]> {
    const now = new Date();

    const trips = await this.travelTripRepository
      .createQueryBuilder('trip')
      .leftJoinAndSelect('trip.userTourist', 'tourist')
      .leftJoinAndSelect('trip.userEmployee', 'employee')
      .leftJoinAndSelect('trip.travelPackage', 'package')
      .where('trip.start_date <= :now', { now })
      .andWhere('trip.end_date >= :now', { now })
      .orderBy('trip.start_date', 'ASC')
      .getMany();

    return TravelTripResponseDto.fromTravelTrips(trips);
  }

  async findCompletedTrips(): Promise<TravelTripResponseDto[]> {
    const now = new Date();

    const trips = await this.travelTripRepository
      .createQueryBuilder('trip')
      .leftJoinAndSelect('trip.userTourist', 'tourist')
      .leftJoinAndSelect('trip.userEmployee', 'employee')
      .leftJoinAndSelect('trip.travelPackage', 'package')
      .where('trip.end_date < :now', { now })
      .orderBy('trip.end_date', 'DESC')
      .getMany();

    return TravelTripResponseDto.fromTravelTrips(trips);
  }

  async updateTrip(id: string, dto: UpdateTravelTripRequestDto): Promise<TravelTripResponseDto> {
    return await this.dataSource.transaction(async (manager) => {
      const tripRepository = manager.getRepository(TravelTrip);

      const trip = await tripRepository.findOne({
        where: { id },
        relations: ['userTourist', 'userEmployee', 'travelPackage']
      });

      if (!trip) {
        throw new NotFoundException(`Trip dengan id ${id} tidak ditemukan`);
      }

      if (dto.startDate || dto.endDate) {
        const startDate = dto.startDate ? new Date(dto.startDate) : trip.startDate;
        const endDate = dto.endDate ? new Date(dto.endDate) : trip.endDate;

        if (startDate >= endDate) {
          throw new ConflictException('Start date harus lebih awal dari end date');
        }

        const tripDurationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        if (tripDurationDays !== trip.travelPackage.durationDays) {
          throw new ConflictException(
            `Durasi trip (${tripDurationDays} hari) tidak sesuai dengan durasi package (${trip.travelPackage.durationDays} hari)`
          );
        }

        const overlappingTrip = await tripRepository
          .createQueryBuilder('trip')
          .where('trip.user_tourist_id = :touristId', { touristId: trip.userTourist.id })
          .andWhere('trip.id != :currentTripId', { currentTripId: id })
          .andWhere(
            '(trip.start_date BETWEEN :startDate AND :endDate OR trip.end_date BETWEEN :startDate AND :endDate OR (:startDate BETWEEN trip.start_date AND trip.end_date))',
            { startDate, endDate }
          )
          .getOne();

        if (overlappingTrip) {
          throw new ConflictException(
            'Tourist sudah memiliki trip lain di rentang waktu yang sama'
          );
        }

        trip.startDate = startDate;
        trip.endDate = endDate;
      }

      if (dto.notes !== undefined) {
        trip.notes = dto.notes || null;
      }

      const updatedTrip = await tripRepository.save(trip);

      return TravelTripResponseDto.fromTravelTrip(updatedTrip);
    });
  }

  async deleteTrip(id: string): Promise<void> {
    const trip = await this.travelTripRepository.findOne({
      where: { id }
    });

    if (!trip) {
      throw new NotFoundException(`Trip dengan id ${id} tidak ditemukan`);
    }

    const now = new Date();
    if (trip.endDate < now) {
      throw new ConflictException(
        'Tidak dapat menghapus trip yang sudah selesai (history protection)'
      );
    }

    await this.travelTripRepository.remove(trip);
  }
}