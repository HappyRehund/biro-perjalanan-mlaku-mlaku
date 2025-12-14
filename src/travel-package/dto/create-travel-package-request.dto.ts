// src/travel-package/dto/create-travel-package.dto.ts
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, ValidateNested } from 'class-validator';
import { CreateItineraryRequestDto } from './create-itinerary-request.dto';

export class CreateTravelPackageRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  country: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  province: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;

  @Type(() => Number)
  @IsNumber({maxDecimalPlaces: 2})
  @Min(0)
  basePrice: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationDays: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateItineraryRequestDto)
  itineraries: CreateItineraryRequestDto[];
}