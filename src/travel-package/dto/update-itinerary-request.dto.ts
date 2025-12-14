import { PartialType } from '@nestjs/mapped-types';
import { CreateItineraryRequestDto } from './create-itinerary-request.dto';

export class UpdateItineraryRequestDto extends PartialType(CreateItineraryRequestDto) {}