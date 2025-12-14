// src/travel-spot/dto/update-travel-spot-request.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelSpotRequestDto } from './create-travel-spot-request.dto';

export class UpdateTravelSpotRequestDto extends PartialType(CreateTravelSpotRequestDto) {}