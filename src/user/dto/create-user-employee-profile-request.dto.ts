import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator"

export class CreateUserEmployeeProfileRequestDto {
  @ApiProperty({
    description: 'Employee full name',
    example: 'Budi Santoso',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  fullName: string

  @ApiProperty({
    description: 'Unique employee identification code',
    example: 'EMP-2024-001',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  employeeCode: string

  @ApiProperty({
    description: 'Employee phone number (Indonesian format)',
    example: '+628123456789',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string
}