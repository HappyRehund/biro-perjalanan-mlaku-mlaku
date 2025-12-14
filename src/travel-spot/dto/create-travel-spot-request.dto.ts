// src/travel-spot/dto/create-travel-spot-request.dto.ts
import { IsLatitude, IsLongitude, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTravelSpotRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'Nama tempat wisata tidak boleh kosong' })
  @MaxLength(255, { message: 'Nama maksimal 255 karakter' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Deskripsi tidak boleh kosong' })
  description: string;

  @IsString()
  @IsNotEmpty()
  city: string

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude({ message: 'Latitude harus antara -90 dan 90' })
  latitude: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude({ message: 'Longitude harus antara -180 dan 180' })
  longitude: number;
}