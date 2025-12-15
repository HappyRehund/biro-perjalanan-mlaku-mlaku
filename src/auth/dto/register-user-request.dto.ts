import { ApiProperty } from '@nestjs/swagger';
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength, ValidateNested } from "class-validator";
import { CreateUserEmployeeProfileRequestDto } from "src/user/dto/create-user-employee-profile-request.dto";

export class RegisterUserTouristRequestDto {
  @ApiProperty({
    description: 'Unique username',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({
    description: 'User email address',
    example: 'tourist@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    description: 'User password (min 8 chars, must contain: uppercase, number, special character)',
    example: 'Tourist@123',
    minLength: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[A-Z]/, {
    message: "Password minimal ada 1 huruf kapital"
  })
  @Matches(/[0-9]/, {
    message: "Password minimal ada 1 huruf Angka"
  })
  @Matches(/[^A-Za-z0-9]/, {
    message: "Password minimal ada 1 karakter spesial"
  })
  password: string
}

export class RegisterUserEmployeeRequestDto {
  @ApiProperty({
    description: 'Employee email address',
    example: 'employee@mlakumlaku.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Unique username',
    example: 'janesmith',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Employee password (min 8 chars, must contain: uppercase, number, special character)',
    example: 'Employee@123',
    minLength: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[A-Z]/, { message: 'Password minimal ada 1 huruf kapital' })
  @Matches(/[0-9]/, { message: 'Password minimal ada 1 angka' })
  @Matches(/[^A-Za-z0-9]/, { message: 'Password minimal ada 1 karakter spesial' })
  password: string;

  @ApiProperty({
    description: 'Employee profile details',
    type: () => CreateUserEmployeeProfileRequestDto,
  })
  @ValidateNested()
  @Type(() => CreateUserEmployeeProfileRequestDto)
  profile: CreateUserEmployeeProfileRequestDto;
}