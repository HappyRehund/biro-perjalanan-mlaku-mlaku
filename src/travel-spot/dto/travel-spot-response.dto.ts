import { ApiProperty } from '@nestjs/swagger';
import { TravelSpot } from '../entity/travel-spot.entity';

export class TravelSpotResponseDto {
  @ApiProperty({
    description: 'Travel spot unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Travel spot name',
    example: 'Candi Borobudur',
  })
  name: string;

  @ApiProperty({
    description: 'Travel spot description',
    example: 'Candi Buddha terbesar di dunia, warisan UNESCO yang megah',
  })
  description: string;

  @ApiProperty({
    description: 'City location',
    example: 'Magelang',
  })
  city: string;

  @ApiProperty({
    description: 'Latitude coordinate',
    example: -7.6079,
    type: Number,
  })
  latitude: number;

  @ApiProperty({
    description: 'Longitude coordinate',
    example: 110.2038,
    type: Number,
  })
  longitude: number;

  static fromTravelSpot(spot: TravelSpot): TravelSpotResponseDto {
    const dto = new TravelSpotResponseDto();

    dto.id = spot.id;
    dto.name = spot.name;
    dto.description = spot.description;
    dto.city = spot.city;
    dto.latitude = Number(spot.latitude);
    dto.longitude = Number(spot.longitude);

    return dto;
  }

  static fromTravelSpots(spots: TravelSpot[]): TravelSpotResponseDto[] {
    return spots.map(spot => TravelSpotResponseDto.fromTravelSpot(spot));
  }
}