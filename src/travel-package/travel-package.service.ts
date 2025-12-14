import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelPackage } from './entity/travel-package.entity';
import { PackageItinerary } from './entity/package-itinerary.entity';
import { DataSource, Repository } from 'typeorm';
import { TravelSpotService } from 'src/travel-spot/travel-spot.service';
import { CreateTravelPackageRequestDto } from './dto/create-travel-package-request.dto';
import { TravelPackageResponseDto } from './dto/travel-package-response.dto';
import { TravelSpot } from 'src/travel-spot/entity/travel-spot.entity';
import { UpdateTravelPackageRequestDto } from './dto/update-travel-package-request.dto';
import { CreateItineraryRequestDto } from './dto/create-itinerary-request.dto';
import { ItineraryResponseDto } from './dto/itinerary-response.dto';
import { UpdateItineraryRequestDto } from './dto/update-itinerary-request.dto';

@Injectable()
export class TravelPackageService {

  constructor(
    @InjectRepository(TravelPackage)
    private readonly travelPackageRepository: Repository<TravelPackage>,
    @InjectRepository(PackageItinerary)
    private readonly itineraryRepository: Repository<PackageItinerary>,
    private readonly travelSpotService: TravelSpotService,
    private readonly dataSource: DataSource
  ){}

  async createTravelPackage(dto: CreateTravelPackageRequestDto): Promise<TravelPackageResponseDto> {
    const existingTravelPackage = await this.travelPackageRepository.findOne({
      where: {
        name: dto.name
      }
    })

    if (existingTravelPackage){
      throw new ConflictException(
        "Paket wisata sudah ada"
      )
    }

    const travelSpotIds = dto.itineraries.map(it => it.travelSpotId)

    const travelSpots = await this.validateSpotsExistAndReturn(travelSpotIds)

    const maxDaySequence = Math.max(...dto.itineraries.map(it => it.daySequence))
    if (maxDaySequence > dto.durationDays){
      throw new ConflictException(
        `Day Sequence max adalah ${maxDaySequence} tidak boleh lebih dari duration days (${dto.durationDays})`
      )
    }

    return await this.dataSource.transaction(async(manager) => {

      const travelPackage = manager.create(TravelPackage, {
        name: dto.name,
        description: dto.description,
        country: dto.country,
        province: dto.province,
        city: dto.city,
        basePrice: dto.basePrice,
        durationDays: dto.durationDays
      })

      const savedTravelPackage = await manager.save(TravelPackage, travelPackage)

      const travelSpotMap = new Map(travelSpots.map(travelSpot => [travelSpot.id, travelSpot]))

      const itineraries = dto.itineraries.map(itineraryDto => {
        return manager.create(PackageItinerary, {
          travelPackage: savedTravelPackage,
          travelSpot: travelSpotMap.get(itineraryDto.travelSpotId),
          daySequence: itineraryDto.daySequence,
          startTime: itineraryDto.startTime,
          endTime: itineraryDto.endTime,
          activityDetail: itineraryDto.activityDetail
        })
      })

      const savedItineraries = await manager.save(PackageItinerary, itineraries)

      savedTravelPackage.itineraries = savedItineraries

      return TravelPackageResponseDto.fromTravelPackage(savedTravelPackage, true)
    })
  }

  async findAllTravelPackages(includeItineraries: boolean = false): Promise<TravelPackageResponseDto[]> {
    const travelPackages = await this.travelPackageRepository.find({
      relations: includeItineraries ? ['itineraries', 'itineraries.travelSpot'] : [],
      order: {
        createdAt: 'DESC',
        ...(includeItineraries && { itineraries: { daySequence: 'ASC' }})
      }
    })

    return TravelPackageResponseDto.fromTravelPackages(travelPackages, includeItineraries)
  }

  async findTravelPackageById(id: string, includeItineraries: boolean = true): Promise<TravelPackageResponseDto> {
    const travelPackage = await this.travelPackageRepository.findOne({
      where: { id },
      relations: includeItineraries ? ['itineraries', 'itineraries.travelSpot'] : [],
      order: includeItineraries ? { itineraries: { daySequence: 'ASC' } } : {}
    })

    if (!travelPackage) {
      throw new NotFoundException('Travel package ndak ketemu bos')
    }

    return TravelPackageResponseDto.fromTravelPackage(travelPackage, includeItineraries)
  }

  // ini tuh sama seperti findTravel cuma bedanya ga di convert ke DTO aja
  async getTravelPackageEntity(id: string): Promise<TravelPackage> {
    const travelPackage = await this.travelPackageRepository.findOne({
      where: { id }
    })

    if (!travelPackage) {
      throw new NotFoundException('Travel package ora ketemu boss')
    }

    return travelPackage;
  }

  async updateTravelPackage(id: string, dto: UpdateTravelPackageRequestDto): Promise<TravelPackageResponseDto> {
    const travelPackage = await this.travelPackageRepository.findOne({
      where: { id },
      relations: ['itineraries', 'itineraries.travelSpot'],
      order: { itineraries: { daySequence: 'ASC' } }
    });

    if (!travelPackage) {
      throw new NotFoundException('Travel package tidak ketemu')
    }

    if (dto.name && dto.name !== travelPackage.name) {
    const existingPackage = await this.travelPackageRepository.findOne({
      where: { name: dto.name }
    });

    if (existingPackage) {
      throw new ConflictException(
        `Paket wisata dengan nama "${dto.name}" sudah ada`
      );
    }}

    if (dto.name !== undefined) travelPackage.name = dto.name;
    if (dto.description !== undefined) travelPackage.description = dto.description;
    if (dto.country !== undefined) travelPackage.country = dto.country;
    if (dto.province !== undefined) travelPackage.province = dto.province;
    if (dto.city !== undefined) travelPackage.city = dto.city;
    if (dto.basePrice !== undefined) travelPackage.basePrice = dto.basePrice;
    if (dto.durationDays !== undefined) {

      const maxDaySequence = travelPackage.itineraries && travelPackage.itineraries.length > 0
        ? Math.max(...travelPackage.itineraries.map(it => it.daySequence))
        : 0;

      if (maxDaySequence > dto.durationDays) {
        throw new ConflictException(
          `Tidak dapat mengurangi duration days menjadi ${dto.durationDays}. Ada itinerary di hari ${maxDaySequence}`
        );
      }

      travelPackage.durationDays = dto.durationDays;
    }
    const updatedPackage = await this.travelPackageRepository.save(travelPackage);

    return TravelPackageResponseDto.fromTravelPackage(updatedPackage)
  }

  async deleteTravelPackage(id: string): Promise<void> {
    const travelPackage = await this.getTravelPackageEntity(id)
    await this.travelPackageRepository.remove(travelPackage)
  }

  // Itinerary
  async addItinerary(packageId: string, dto: CreateItineraryRequestDto): Promise<ItineraryResponseDto> {
    const travelPackage = await this.getTravelPackageEntity(packageId)

    const travelSpot = await this.travelSpotService.findTravelSpotById(dto.travelSpotId)

    if (dto.daySequence > travelPackage.durationDays) {
      throw new ConflictException(
        `Day sequence (${dto.daySequence}) ga bisa ya lebih gede dari duration days (${travelPackage.durationDays})`
      )
    }

    const existingItinerary = await this.itineraryRepository.findOne({
      where: {
        travelPackage: { id: packageId },
        travelSpot: { id: dto.travelSpotId },
        daySequence: dto.daySequence
      }
    });

    if (existingItinerary) {
      throw new ConflictException(
        `Spot "${travelSpot.name}" sudah ada di itinerary hari ${dto.daySequence}`
      );
    }

    const itinerary = this.itineraryRepository.create({
      travelPackage,
      travelSpot,
      daySequence: dto.daySequence,
      startTime: dto.startTime,
      endTime: dto.endTime,
      activityDetail: dto.activityDetail
    });

    const savedItinerary = await this.itineraryRepository.save(itinerary);

    savedItinerary.travelSpot = travelSpot;

    return ItineraryResponseDto.fromItinerary(savedItinerary);
  }

  async getItinerariesByPackage(packageId: string): Promise<ItineraryResponseDto[]> {
    await this.getTravelPackageEntity(packageId);

    const itineraries = await this.itineraryRepository.find({
      where: { travelPackage: { id: packageId } },
      relations: ['travelSpot'],
      order: {
        daySequence: 'ASC',
        startTime: 'ASC'
      }
    });

    return ItineraryResponseDto.fromItineraries(itineraries);
  }

  async getItineraryById(packageId: string, itineraryId: string): Promise<ItineraryResponseDto> {
    const itinerary = await this.itineraryRepository.findOne({
    where: {
        id: itineraryId,
        travelPackage: { id: packageId }
      },
      relations: ['travelSpot']
    });

    if (!itinerary) {
      throw new NotFoundException(
        `Itinerary dengan id ${itineraryId} tidak ditemukan di package ${packageId}`
      );
    }

    return ItineraryResponseDto.fromItinerary(itinerary);
  }

  async updateItinerary(
    packageId: string,
    itineraryId: string,
    dto: UpdateItineraryRequestDto
  ): Promise<ItineraryResponseDto> {
    const itinerary = await this.itineraryRepository.findOne({
      where: {
        id: itineraryId,
        travelPackage: { id: packageId }
      },
      relations: ['travelPackage', 'travelSpot']
    });

    if (!itinerary) {
      throw new NotFoundException(
        `Itinerary dengan id ${itineraryId} tidak ditemukan di package ${packageId}`
      );
    }


    let newTravelSpot: TravelSpot | null = null;
    if (dto.travelSpotId && dto.travelSpotId !== itinerary.travelSpot.id) {
      newTravelSpot = await this.travelSpotService.findTravelSpotById(dto.travelSpotId);
      itinerary.travelSpot = newTravelSpot;
    }

    if (dto.daySequence !== undefined && dto.daySequence !== itinerary.daySequence) {
      if (dto.daySequence > itinerary.travelPackage.durationDays) {
        throw new ConflictException(
          `Day sequence (${dto.daySequence}) tidak boleh lebih dari duration days (${itinerary.travelPackage.durationDays})`
        );
      }

      const checkTravelSpotId = dto.travelSpotId || itinerary.travelSpot.id;
      const existingItinerary = await this.itineraryRepository.findOne({
        where: {
          travelPackage: { id: packageId },
          travelSpot: { id: checkTravelSpotId },
          daySequence: dto.daySequence
        }
      });

      if (existingItinerary && existingItinerary.id !== itineraryId) {
        throw new ConflictException(
          `Spot sudah ada di itinerary hari ${dto.daySequence}`
        );
      }
      itinerary.daySequence = dto.daySequence;
    }

    if (dto.startTime !== undefined) itinerary.startTime = dto.startTime;
    if (dto.endTime !== undefined) itinerary.endTime = dto.endTime;
    if (dto.activityDetail !== undefined) itinerary.activityDetail = dto.activityDetail;

    const updatedItinerary = await this.itineraryRepository.save(itinerary);

    updatedItinerary.travelSpot = newTravelSpot || itinerary.travelSpot;

    return ItineraryResponseDto.fromItinerary(updatedItinerary);
  }

  async deleteItinerary(
    packageId: string,
    itineraryId: string
  ): Promise<void> {
    const itinerary = await this.itineraryRepository.findOne({
      where: {
        id: itineraryId,
        travelPackage: { id: packageId }
      }
    });

    if (!itinerary) {
      throw new NotFoundException(
        `Itinerary dengan id ${itineraryId} tidak ditemukan di package ${packageId}`
      );
    }

    await this.itineraryRepository.remove(itinerary);
  }

  private async validateSpotsExistAndReturn(travelSpotIds: string[]): Promise<TravelSpot[]> {
    const uniqueTravelSpotIds = [...new Set(travelSpotIds)]

    const travelSpots = await this.travelSpotService.getTravelSpotEntities(uniqueTravelSpotIds)

    if (travelSpots.length !== uniqueTravelSpotIds.length){
      const foundIds = travelSpots.map(s => s.id)
      const missingIds = uniqueTravelSpotIds.filter(id => !foundIds.includes(id))

      throw new ConflictException(
        `Spot dengan id berikut tidak ditemukan: ${missingIds.join(', ')}`
      )
    }

    return travelSpots
  }

}
