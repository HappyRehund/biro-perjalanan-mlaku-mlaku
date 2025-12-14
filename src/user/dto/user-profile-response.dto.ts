import { UserEmployeeProfile } from "../entity/user-employee-profile.entity";
import { UserTouristProfile } from "../entity/user-tourist-profle.entity";
import { User } from "../entity/user.entity";
import { Role } from "../enum/user-role.enum";

export class UserResponseDto {
  id: string
  email: string
  username: string
  role: Role
  isActive: boolean
  profile?: UserTouristProfileDto | UserEmployeeProfileDto

  static fromUser(user: User): UserResponseDto {
    const dto = new UserResponseDto()

    dto.id = user.id
    dto.email = user.email
    dto.username = user.username
    dto.role = user.role
    dto.isActive = user.isActive

    if (user.userTouristProfile){
      dto.profile = UserTouristProfileDto.fromUserTouristProfile(user.userTouristProfile)
    } else if (user.userEmployeeProfile){
      dto.profile = UserEmployeeProfileDto.fromUserEmployeeProfile(user.userEmployeeProfile)
    }

    return dto
  }

  static fromUsers(users: User[]): UserResponseDto[] {
    return users.map(user => UserResponseDto.fromUser(user))
  }
}

export class UserTouristProfileDto {
  id: string;
  fullName: string;
  identityNumber: string;
  address: string
  phoneNumber: string;

  static fromUserTouristProfile(profile: UserTouristProfile): UserTouristProfileDto {
    const dto = new UserTouristProfileDto()
    dto.id = profile.id
    dto.fullName = profile.fullName
    dto.identityNumber = profile.identityNumber
    dto.address = profile.address
    dto.phoneNumber = profile.phoneNumber

    return dto
  }
}

export class UserEmployeeProfileDto {
  id: string;
  fullName: string;
  employeeCode: string;
  phoneNumber: string;

  static fromUserEmployeeProfile(profile: UserEmployeeProfile): UserEmployeeProfileDto {
    const dto = new UserEmployeeProfileDto()
    dto.id = profile.id
    dto.fullName = profile.fullName
    dto.employeeCode = profile.employeeCode
    dto.phoneNumber = profile.phoneNumber

    return dto
  }
}