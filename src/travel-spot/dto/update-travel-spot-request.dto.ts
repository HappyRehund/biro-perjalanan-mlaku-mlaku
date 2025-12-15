// src/travel-spot/dto/update-travel-spot-request.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateTravelSpotRequestDto } from './create-travel-spot-request.dto';

export class UpdateTravelSpotRequestDto extends PartialType(CreateTravelSpotRequestDto) {}