import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateTravelPackageRequestDto } from './create-travel-package-request.dto';

// Omit itineraries karena akan dikelola lewat endpoint terpisah
export class UpdateTravelPackageRequestDto extends PartialType(
  OmitType(CreateTravelPackageRequestDto, ['itineraries'] as const)
) {}