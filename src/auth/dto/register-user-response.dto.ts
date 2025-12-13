import { User } from "src/user/entity/user.entity";

export class RegisterUserResponseDto {
  username: string
  email: string
  message: string

  static fromUser(user: User): RegisterUserResponseDto {
    const dto = new RegisterUserResponseDto();
    dto.username = user.username
    dto.email = user.email
    dto.message = `User with email ${user.email} and username ${user.username} successfully created`
    return dto;
  }
}