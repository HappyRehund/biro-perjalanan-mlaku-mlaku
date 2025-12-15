import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateTravelTripRequestDto } from './create-travel-trip-request.dto';

export class UpdateTravelTripRequestDto extends PartialType(
  OmitType(CreateTravelTripRequestDto, [
    'userTouristId',
    'userEmployeeId',
    'travelPackageId'
  ] as const)
) {}