import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, IsUUID, Matches, Min } from 'class-validator';

export class CreateItineraryRequestDto {
  @ApiProperty({
    description: 'Travel spot UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  travelSpotId: string;

  @ApiProperty({
    description: 'Day number in the package sequence',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  daySequence: number;

  @ApiProperty({
    description: 'Activity start time (HH:mm:ss format)',
    example: '08:30:00',
    pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'Start time harus format HH:mm:ss (08:30:00)'
  })
  startTime: string;

  @ApiProperty({
    description: 'Activity end time (HH:mm:ss format)',
    example: '17:00:00',
    pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'End time harus format HH:mm:ss'
  })
  endTime: string;

  @ApiProperty({
    description: 'Detailed description of activities at this spot',
    example: 'Visit Borobudur Temple at sunrise, explore the magnificent Buddhist monument',
  })
  @IsString()
  @IsNotEmpty()
  activityDetail: string;
}