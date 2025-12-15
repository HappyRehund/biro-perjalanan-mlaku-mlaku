import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min, ValidateNested } from 'class-validator';
import { CreateItineraryRequestDto } from './create-itinerary-request.dto';

export class CreateTravelPackageRequestDto {
  @ApiProperty({
    description: 'Travel package name',
    example: 'Yogyakarta Cultural Heritage Tour',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Detailed description of the travel package',
    example: 'Explore ancient temples and traditional culture of Yogyakarta in 3 days',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Country where the package is located',
    example: 'Indonesia',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  country: string;

  @ApiProperty({
    description: 'Province where the package is located',
    example: 'Yogyakarta',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  province: string;

  @ApiProperty({
    description: 'City where the package is located',
    example: 'Yogyakarta',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;

  @ApiProperty({
    description: 'Base price in IDR (Indonesian Rupiah)',
    example: 2500000,
    minimum: 0,
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  basePrice: number;

  @ApiProperty({
    description: 'Package duration in days',
    example: 3,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationDays: number;

  @ApiProperty({
    description: 'List of itineraries for the package',
    type: [CreateItineraryRequestDto],
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateItineraryRequestDto)
  itineraries: CreateItineraryRequestDto[];
}