// src/travel-spot/dto/travel-spot-response.dto.ts
import { TravelSpot } from '../entity/travel-spot.entity';

export class TravelSpotResponseDto {
  id: string;
  name: string;
  description: string;
  city: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;

  static fromTravelSpot(spot: TravelSpot): TravelSpotResponseDto {
    const dto = new TravelSpotResponseDto();
    dto.id = spot.id;
    dto.name = spot.name;
    dto.description = spot.description;
    dto.city = spot.city;
    dto.latitude = Number(spot.latitude);
    dto.longitude = Number(spot.longitude);
    dto.createdAt = spot.createdAt;
    dto.updatedAt = spot.updatedAt;
    return dto;
  }

  static fromTravelSpots(spots: TravelSpot[]): TravelSpotResponseDto[] {
    return spots.map(spot => TravelSpotResponseDto.fromTravelSpot(spot));
  }
}