import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator"

export class CreateUserTouristProfileRequestDto {
  @ApiProperty({
    description: 'Tourist full name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string

  @ApiProperty({
    description: 'Identity card number (KTP/Passport)',
    example: '3174012345678901',
  })
  @IsString()
  @IsNotEmpty()
  identityNumber: string

  @ApiProperty({
    description: 'Tourist full address',
    example: 'Jl. Malioboro No. 123, Yogyakarta, 55271',
  })
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiProperty({
    description: 'Tourist phone number',
    example: '+628123456789',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string
}