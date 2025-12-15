import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateTravelPackageRequestDto } from './create-travel-package-request.dto';

export class UpdateTravelPackageRequestDto extends PartialType(
  OmitType(CreateTravelPackageRequestDto, ['itineraries'] as const)
) {}