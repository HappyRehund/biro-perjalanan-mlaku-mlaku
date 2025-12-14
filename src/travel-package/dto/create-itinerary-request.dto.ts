// src/travel-package/dto/create-itinerary.dto.ts
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, IsUUID, Matches, Min } from 'class-validator';

export class CreateItineraryRequestDto {
  @IsUUID()
  @IsNotEmpty()
  spotId: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  daySequence: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'Start time harus format HH:mm:ss (08:30:00)'
  })
  startTime: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'End time harus format HH:mm:ss'
  })
  endTime: string;

  @IsString()
  @IsNotEmpty()
  activityDetail: string;
}