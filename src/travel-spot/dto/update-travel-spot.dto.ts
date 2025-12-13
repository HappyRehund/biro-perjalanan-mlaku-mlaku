import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelSpotDto } from './create-travel-spot.dto';

export class UpdateTravelSpotDto extends PartialType(CreateTravelSpotDto) {}
