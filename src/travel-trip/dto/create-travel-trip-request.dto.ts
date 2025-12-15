import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTravelTripRequestDto {
  @ApiProperty({
    description: 'Tourist user UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4')
  @IsNotEmpty()
  userTouristId: string;

  @ApiProperty({
    description: 'Employee user UUID who handles the trip',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID('4')
  @IsNotEmpty()
  userEmployeeId: string;

  @ApiProperty({
    description: 'Travel package UUID',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  @IsUUID('4')
  @IsNotEmpty()
  travelPackageId: string;

  @ApiProperty({
    description: 'Trip start date in ISO 8601 UTC format',
    example: '2024-12-20T08:00:00.000Z',
    type: String,
  })
  @IsDateString({}, {
    message: 'Start date harus format ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)'
  })
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'Trip end date in ISO 8601 UTC format',
    example: '2024-12-23T17:00:00.000Z',
    type: String,
  })
  @IsDateString({}, {
    message: 'End date harus format ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)'
  })
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({
    description: 'Additional notes for the trip',
    example: 'VIP package with hotel upgrade and private guide',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}