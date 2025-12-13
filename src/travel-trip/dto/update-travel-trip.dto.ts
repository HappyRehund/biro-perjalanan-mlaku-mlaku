import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelTripDto } from './create-travel-trip.dto';

export class UpdateTravelTripDto extends PartialType(CreateTravelTripDto) {}
