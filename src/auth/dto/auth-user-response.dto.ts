import { User } from "src/user/entity/user.entity"
import { Role } from "src/user/enum/user-role.enum"

export class LocalStrategyValidatedResponseDto {
  id: string
  username: string
  email: string
  role: Role
  isActive: boolean

  static fromUser(user: User): LocalStrategyValidatedResponseDto {
    const dto = new LocalStrategyValidatedResponseDto()

    dto.id = user.id
    dto.username = user.username
    dto.email = user.email
    dto.role = user.role
    dto.isActive = user.isActive

    return dto
  }
}

export class LoginUserResponseDto {
  username: string
  email: string
  accessToken: string
  refreshToken: string
  isActive: boolean
  message: string

  static fromValidateLocalStrategyAndTokens(
    user: LocalStrategyValidatedResponseDto,
    accessToken: string,
    refreshToken: string
  ): LoginUserResponseDto {

    const dto = new LoginUserResponseDto()

    dto.username = user.username
    dto.email = user.email
    dto.accessToken = accessToken
    dto.refreshToken = refreshToken
    dto.message =  `user with email ${user.email} successfully logged in`

    return dto
  }
}


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