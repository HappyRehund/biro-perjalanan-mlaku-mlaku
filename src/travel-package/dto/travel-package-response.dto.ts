import { TravelPackage } from '../entity/travel-package.entity';
import { ItineraryResponseDto } from './itinerary-response.dto';

export class TravelPackageResponseDto {
  id: string;
  name: string;
  description: string;
  country: string;
  province: string;
  city: string;
  basePrice: number;
  durationDays: number;
  itineraries?: ItineraryResponseDto[];

  static fromTravelPackage(
    travelPackage: TravelPackage,
    includeItineraries: boolean = false
  ): TravelPackageResponseDto {
    const dto = new TravelPackageResponseDto();
    dto.id = travelPackage.id;
    dto.name = travelPackage.name;
    dto.description = travelPackage.description;
    dto.country = travelPackage.country;
    dto.province = travelPackage.province;
    dto.city = travelPackage.city;
    dto.basePrice = travelPackage.basePrice;
    dto.durationDays = travelPackage.durationDays;

    if (includeItineraries && travelPackage.itineraries) {
      dto.itineraries = ItineraryResponseDto.fromItineraries(
        travelPackage.itineraries
      );
    }
    return dto;
  }

  static fromTravelPackages(
    travelPackages: TravelPackage[],
    includeItineraries: boolean = false
  ): TravelPackageResponseDto[] {
    return travelPackages.map(pkg =>
      this.fromTravelPackage(pkg, includeItineraries)
    );
  }
}