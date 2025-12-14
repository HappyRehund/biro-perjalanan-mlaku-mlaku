import { IsNotEmpty, IsString } from "class-validator"

export class CreateUserEmployeeProfileRequestDto {
  @IsString()
  @IsNotEmpty()
  fullName: string

  @IsString()
  @IsNotEmpty()
  employeeCode: string

  @IsString()
  @IsNotEmpty()
  phoneNumber: string
}