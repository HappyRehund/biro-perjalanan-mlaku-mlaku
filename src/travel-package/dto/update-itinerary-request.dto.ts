import { PartialType } from '@nestjs/swagger';
import { CreateItineraryRequestDto } from './create-itinerary-request.dto';

export class UpdateItineraryRequestDto extends PartialType(CreateItineraryRequestDto) {}