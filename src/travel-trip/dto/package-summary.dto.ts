// src/travel-trip/dto/package-summary.dto.ts
import { TravelPackage } from 'src/travel-package/entity/travel-package.entity';

export class PackageSummaryDto {
  id: string;
  name: string;
  description: string;
  country: string;
  province: string;
  city: string;
  basePrice: number;
  durationDays: number;

  static fromTravelPackage(travelPackage: TravelPackage): PackageSummaryDto {
    const dto = new PackageSummaryDto();
    dto.id = travelPackage.id;
    dto.name = travelPackage.name;
    dto.description = travelPackage.description;
    dto.country = travelPackage.country;
    dto.province = travelPackage.province;
    dto.city = travelPackage.city;
    dto.basePrice = travelPackage.basePrice;
    dto.durationDays = travelPackage.durationDays;
    return dto;
  }
}