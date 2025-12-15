import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTravelSpotRequestDto {
  @ApiProperty({
    description: 'Travel spot name',
    example: 'Candi Borobudur',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty({ message: 'Nama tempat wisata tidak boleh kosong' })
  @MaxLength(255, { message: 'Nama maksimal 255 karakter' })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the travel spot',
    example: 'Candi Buddha terbesar di dunia, warisan UNESCO yang megah',
  })
  @IsString()
  @IsNotEmpty({ message: 'Deskripsi tidak boleh kosong' })
  description: string;

  @ApiProperty({
    description: 'City where the travel spot is located',
    example: 'Magelang',
  })
  @IsString()
  @IsNotEmpty()
  city: string

  @ApiProperty({
    description: 'Latitude coordinate (-90 to 90)',
    example: -7.6079,
    type: Number,
  })
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude({ message: 'Latitude harus antara -90 dan 90' })
  latitude: number;

  @ApiProperty({
    description: 'Longitude coordinate (-180 to 180)',
    example: 110.2038,
    type: Number,
  })
  @Transform(({ value }) => parseFloat(value))
  @IsLongitude({ message: 'Longitude harus antara -180 dan 180' })
  longitude: number;
}