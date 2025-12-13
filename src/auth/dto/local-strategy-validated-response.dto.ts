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