// src/travel-trip/dto/travel-trip-response.dto.ts
import { TravelTrip } from '../entity/travel-trip.entity';
import { UserSummaryDto } from './user-summary.dto';
import { PackageSummaryDto } from './package-summary.dto';

export class TravelTripResponseDto {
  id: string;
  userTourist: UserSummaryDto;
  userEmployee: UserSummaryDto;
  travelPackage: PackageSummaryDto;
  startDate: string;
  endDate: string;
  notes: string | null;

  static fromTravelTrip(trip: TravelTrip): TravelTripResponseDto {
    const dto = new TravelTripResponseDto();
    dto.id = trip.id;

    dto.userTourist = UserSummaryDto.fromUser(trip.userTourist)

    dto.userEmployee = UserSummaryDto.fromUser(trip.userEmployee);

    dto.travelPackage = PackageSummaryDto.fromTravelPackage(trip.travelPackage)

    dto.startDate = trip.startDate.toISOString();
    dto.endDate = trip.endDate.toISOString();
    dto.notes = trip.notes;

    return dto;
  }

  static fromTravelTrips(trips: TravelTrip[]): TravelTripResponseDto[] {
    return trips.map(trip => this.fromTravelTrip(trip));
  }
}