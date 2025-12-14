import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelSpot } from './entity/travel-spot.entity';
import { In, Repository } from 'typeorm';
import { CreateTravelSpotRequestDto } from './dto/create-travel-spot-request.dto';
import { TravelSpotResponseDto } from './dto/travel-spot-response.dto';
import { UpdateTravelSpotRequestDto } from './dto/update-travel-spot-request.dto';

@Injectable()
export class TravelSpotService {
  constructor(
    @InjectRepository(TravelSpot)
    private readonly travelSpotRepository: Repository<TravelSpot>
  ) {}

  async createTravelSpot(dto: CreateTravelSpotRequestDto): Promise<TravelSpotResponseDto> {
    const existingTravelSpot = await this.travelSpotRepository.findOne({
      where: {
        name: dto.name,
        city: dto.city
      }
    });

    if (existingTravelSpot) {
      throw new ConflictException(
        `Tempat wisata dengan nama "${dto.name}" di kota ${dto.city} sudah ada`
      );
    }

    const travelSpot = this.travelSpotRepository.create(dto);
    const newTravelSpot = await this.travelSpotRepository.save(travelSpot);

    return TravelSpotResponseDto.fromTravelSpot(newTravelSpot);
  }

  async findAllTravelSpots(): Promise<TravelSpotResponseDto[]> {
    const travelSpots = await this.travelSpotRepository.find({
      order: {
        createdAt: 'DESC'
      }
    });

    return TravelSpotResponseDto.fromTravelSpots(travelSpots);
  }

  async findTravelSpotById(id: string): Promise<TravelSpot> {
    const travelSpot = await this.travelSpotRepository.findOne({
      where: { id }
    });

    if (!travelSpot) {
      throw new NotFoundException(`Travel spot dengan id ${id} tidak ditemukan`);
    }

    return travelSpot;
  }

  async getTravelSpotEntities(ids: string[]): Promise<TravelSpot[]> {
    return await this.travelSpotRepository.find({
      where: {
        id: In(ids)
      }
    })
  }

  async updateTravelSpot(id: string, dto: UpdateTravelSpotRequestDto): Promise<TravelSpotResponseDto> {
    const travelSpot = await this.findTravelSpotById(id);

    if ((dto.name && dto.name !== travelSpot.name) || (dto.city && dto.city !== travelSpot.city)) {
      const checkName = dto.name || travelSpot.name;
      const checkCity = dto.city || travelSpot.city;

      const existingTravelSpot = await this.travelSpotRepository.findOne({
        where: {
          name: checkName,
          city: checkCity
        }
      });

      if (existingTravelSpot && existingTravelSpot.id !== id) {
        throw new ConflictException(
          `Tempat wisata dengan nama "${checkName}" di kota ${checkCity} sudah ada`
        );
      }
    }

    if (dto.name !== undefined) travelSpot.name = dto.name;
    if (dto.description !== undefined) travelSpot.description = dto.description;
    if (dto.city !== undefined) travelSpot.city = dto.city;
    if (dto.latitude !== undefined) travelSpot.latitude = dto.latitude;
    if (dto.longitude !== undefined) travelSpot.longitude = dto.longitude;

    const updatedTravelSpot = await this.travelSpotRepository.save(travelSpot);

    return TravelSpotResponseDto.fromTravelSpot(updatedTravelSpot);
  }

  async deleteTravelSpot(id: string): Promise<void> {
    const travelSpot = await this.findTravelSpotById(id);
    await this.travelSpotRepository.remove(travelSpot);
  }

  async findTravelSpotsByCity(city: string): Promise<TravelSpotResponseDto[]> {
    const travelSpots = await this.travelSpotRepository.find({
      where: { city },
      order: {
        createdAt: 'DESC'
      }
    });

    return TravelSpotResponseDto.fromTravelSpots(travelSpots);
  }

  async searchTravelSpots(searchTerm: string): Promise<TravelSpotResponseDto[]> {
    const travelSpots = await this.travelSpotRepository
      .createQueryBuilder('spot')
      .where('LOWER(spot.name) LIKE LOWER(:searchTerm)', {
        searchTerm: `%${searchTerm}%`
      })
      .orWhere('LOWER(spot.city) LIKE LOWER(:searchTerm)', {
        searchTerm: `%${searchTerm}%`
      })
      .orderBy('spot.createdAt', 'DESC')
      .getMany();

    return TravelSpotResponseDto.fromTravelSpots(travelSpots);
  }
}