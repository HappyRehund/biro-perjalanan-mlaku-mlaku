import { IsNotEmpty, IsString } from "class-validator"

export class CreateUserTouristProfileRequestDto {
  @IsString()
  @IsNotEmpty()
  fullName: string

  @IsString()
  @IsNotEmpty()
  identityNumber: string

  @IsString()
  @IsNotEmpty()
  address: string

  @IsString()
  @IsNotEmpty()
  phoneNumber: string
}
