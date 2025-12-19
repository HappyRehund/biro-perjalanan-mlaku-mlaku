import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TravelPackage } from '../entity/travel-package.entity';
import { ItineraryResponseDto } from './itinerary-response.dto';

export class TravelPackageResponseDto {
  @ApiProperty({
    description: 'Travel package unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Travel package name',
    example: 'Yogyakarta Cultural Heritage Tour',
  })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the travel package',
    example: 'Explore ancient temples and traditional culture of Yogyakarta in 3 days',
  })
  description: string;

  @ApiProperty({
    description: 'Country',
    example: 'Indonesia',
  })
  country: string;

  @ApiProperty({
    description: 'Province',
    example: 'Yogyakarta',
  })
  province: string;

  @ApiProperty({
    description: 'City',
    example: 'Yogyakarta',
  })
  city: string;

  @ApiProperty({
    description: 'Base price in IDR (Indonesian Rupiah)',
    example: 2500000,
  })
  basePrice: number;

  @ApiProperty({
    description: 'Package duration in days',
    example: 3,
  })
  durationDays: number;

  @ApiPropertyOptional({
    description: 'List of itineraries (included only when includeItineraries=true)',
    type: [ItineraryResponseDto],
  })
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