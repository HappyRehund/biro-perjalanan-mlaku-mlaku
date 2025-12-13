import { LocalStrategyValidatedResponseDto } from "./local-strategy-validated-response.dto"

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