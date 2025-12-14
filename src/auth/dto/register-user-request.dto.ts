import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength, ValidateNested } from "class-validator";
import { CreateUserEmployeeProfileRequestDto } from "src/user/dto/create-user-employee-profile-request.dto";
import { Role } from "src/user/enum/user-role.enum";

export class RegisterUserTouristRequestDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsEmail()
  @IsNotEmpty()
  email: string

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
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[A-Z]/, { message: 'Password minimal ada 1 huruf kapital' })
  @Matches(/[0-9]/, { message: 'Password minimal ada 1 angka' })
  @Matches(/[^A-Za-z0-9]/, { message: 'Password minimal ada 1 karakter spesial' })
  password: string;

  @ValidateNested()
  @Type(() => CreateUserEmployeeProfileRequestDto)
  profile: CreateUserEmployeeProfileRequestDto;
}