// src/travel-package/dto/itinerary-response.dto.ts
import { TravelSpotResponseDto } from 'src/travel-spot/dto/travel-spot-response.dto';
import { PackageItinerary } from '../entity/package-itinerary.entity';

export class ItineraryResponseDto {
  id: string;
  daySequence: number;
  startTime: string;
  endTime: string;
  activityDetail: string;
  travelSpot: TravelSpotResponseDto;

  static fromItinerary(itinerary: PackageItinerary): ItineraryResponseDto {
    const dto = new ItineraryResponseDto()
    dto.id = itinerary.id
    dto.daySequence = itinerary.daySequence
    dto.startTime = itinerary.startTime
    dto.endTime = itinerary.endTime
    dto.activityDetail = itinerary.activityDetail
    dto.travelSpot = TravelSpotResponseDto.fromTravelSpot(itinerary.travelSpot)
    return dto;
  }

  static fromItineraries(itineraries: PackageItinerary[]): ItineraryResponseDto[] {
    return itineraries.map(itinerary => this.fromItinerary(itinerary));
  }
}