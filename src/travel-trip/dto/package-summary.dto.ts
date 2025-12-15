import { ApiProperty } from '@nestjs/swagger';
import { TravelPackage } from 'src/travel-package/entity/travel-package.entity';

export class PackageSummaryDto {
  @ApiProperty({
    description: 'Package unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  id: string;

  @ApiProperty({
    description: 'Package name',
    example: 'Yogyakarta Cultural Heritage Tour',
  })
  name: string;

  @ApiProperty({
    description: 'Package description',
    example: 'Explore ancient temples and traditional culture',
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
    description: 'Base price in IDR',
    example: 2500000,
  })
  basePrice: number;

  @ApiProperty({
    description: 'Duration in days',
    example: 3,
  })
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