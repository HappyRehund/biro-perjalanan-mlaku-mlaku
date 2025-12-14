import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelPackage } from './entity/travel-package.entity';
import { PackageItinerary } from './entity/package-itinerary.entity';
import { DataSource, Repository } from 'typeorm';
import { TravelSpotService } from 'src/travel-spot/travel-spot.service';
import { CreateTravelPackageRequestDto } from './dto/create-travel-package-request.dto';
import { TravelPackageResponseDto } from './dto/travel-package-response.dto';
import { TravelSpot } from 'src/travel-spot/entity/travel-spot.entity';

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

      const spotMap = new Map(travelSpots.map(spot => [spot.id, spot]))

      const itineraries = dto.itineraries.map(itineraryDto => {
        return manager.create(PackageItinerary, {
          travelPackage: savedTravelPackage,
          travelSpot: spotMap.get(itineraryDto.travelSpotId),
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

  private async validateSpotsExistAndReturn(spotIds: string[]): Promise<TravelSpot[]> {
    const uniqueSpotIds = [...new Set(spotIds)]

    const spots = await this.travelSpotService.getTravelSpotEntities(uniqueSpotIds)

    if (spots.length !== uniqueSpotIds.length){
      const foundIds = spots.map(s => s.id)
      const missingIds = uniqueSpotIds.filter(id => !foundIds.includes(id))

      throw new ConflictException(
        `Spot dengan id berikut tidak ditemukan: ${missingIds.join(', ')}`
      )
    }

    return spots
  }

}
