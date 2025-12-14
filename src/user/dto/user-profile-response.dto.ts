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
  profile?: UserTouristProfileResponseDto | UserEmployeeProfileResponseDto

  static fromUser(user: User): UserResponseDto {
    const dto = new UserResponseDto()

    dto.id = user.id
    dto.email = user.email
    dto.username = user.username
    dto.role = user.role
    dto.isActive = user.isActive

    if (user.userTouristProfile){
      dto.profile = UserTouristProfileResponseDto.fromEntity(user.userTouristProfile)
    } else if (user.userEmployeeProfile){
      dto.profile = UserEmployeeProfileResponseDto.fromEntity(user.userEmployeeProfile)
    }

    return dto
  }
}

export class UserTouristProfileResponseDto {
  id: string;
  fullName: string;
  identityNumber: string;
  address: string
  phoneNumber: string;

  static fromEntity(profile: UserTouristProfile): UserTouristProfileResponseDto {
    const dto = new UserTouristProfileResponseDto()
    dto.id = profile.id
    dto.fullName = profile.fullName
    dto.identityNumber = profile.identityNumber
    dto.address = profile.address
    dto.phoneNumber = profile.phoneNumber

    return dto
  }
}

export class UserEmployeeProfileResponseDto {
  id: string;
  fullName: string;
  employeeCode: string;
  phoneNumber: string;

  static fromEntity(profile: UserEmployeeProfile): UserEmployeeProfileResponseDto {
    const dto = new UserEmployeeProfileResponseDto()
    dto.id = profile.id
    dto.fullName = profile.fullName
    dto.employeeCode = profile.employeeCode
    dto.phoneNumber = profile.phoneNumber

    return dto
  }
}