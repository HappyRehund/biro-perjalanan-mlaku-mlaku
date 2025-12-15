import { ApiProperty } from '@nestjs/swagger';
import { TravelTrip } from '../entity/travel-trip.entity';
import { UserSummaryDto } from './user-summary.dto';
import { PackageSummaryDto } from './package-summary.dto';

export class TravelTripResponseDto {
  @ApiProperty({
    description: 'Trip unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174003',
  })
  id: string;

  @ApiProperty({
    description: 'Tourist user information',
    type: () => UserSummaryDto,
  })
  userTourist: UserSummaryDto;

  @ApiProperty({
    description: 'Employee user information',
    type: () => UserSummaryDto,
  })
  userEmployee: UserSummaryDto;

  @ApiProperty({
    description: 'Travel package information',
    type: () => PackageSummaryDto,
  })
  travelPackage: PackageSummaryDto;

  @ApiProperty({
    description: 'Trip start date in ISO 8601 UTC format',
    example: '2024-12-20T08:00:00.000Z',
  })
  startDate: string;

  @ApiProperty({
    description: 'Trip end date in ISO 8601 UTC format',
    example: '2024-12-23T17:00:00.000Z',
  })
  endDate: string;

  @ApiProperty({
    description: 'Additional notes for the trip',
    example: 'VIP package with hotel upgrade',
    nullable: true,
  })
  notes: string | null;

  static fromTravelTrip(trip: TravelTrip): TravelTripResponseDto {
    const dto = new TravelTripResponseDto();
    dto.id = trip.id;
    dto.userTourist = UserSummaryDto.fromUser(trip.userTourist);
    dto.userEmployee = UserSummaryDto.fromUser(trip.userEmployee);
    dto.travelPackage = PackageSummaryDto.fromTravelPackage(trip.travelPackage);
    dto.startDate = trip.startDate.toISOString();
    dto.endDate = trip.endDate.toISOString();
    dto.notes = trip.notes;
    return dto;
  }

  static fromTravelTrips(trips: TravelTrip[]): TravelTripResponseDto[] {
    return trips.map(trip => this.fromTravelTrip(trip));
  }
}