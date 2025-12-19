import { ApiProperty } from '@nestjs/swagger';
import { TravelSpotResponseDto } from 'src/travel-spot/dto/travel-spot-response.dto';
import { PackageItinerary } from '../entity/package-itinerary.entity';

export class ItineraryResponseDto {
  @ApiProperty({
    description: 'Itinerary unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  id: string;

  @ApiProperty({
    description: 'Day number in the package sequence',
    example: 1,
  })
  daySequence: number;

  @ApiProperty({
    description: 'Activity start time (HH:mm:ss format)',
    example: '08:30:00',
  })
  startTime: string;

  @ApiProperty({
    description: 'Activity end time (HH:mm:ss format)',
    example: '17:00:00',
  })
  endTime: string;

  @ApiProperty({
    description: 'Detailed description of activities',
    example: 'Visit Borobudur Temple at sunrise, explore the magnificent Buddhist monument',
  })
  activityDetail: string;

  @ApiProperty({
    description: 'Travel spot details',
    type: () => TravelSpotResponseDto,
  })
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