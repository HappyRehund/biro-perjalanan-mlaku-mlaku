import { ApiProperty } from '@nestjs/swagger';
import { UserEmployeeProfile } from "../entity/user-employee-profile.entity";
import { UserTouristProfile } from "../entity/user-tourist-profle.entity";
import { User } from "../entity/user.entity";
import { Role } from "../enum/user-role.enum";

export class UserResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string

  @ApiProperty({
    description: 'User email address',
    example: 'tourist@gmail.com',
  })
  email: string

  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
  })
  username: string

  @ApiProperty({
    description: 'User role',
    enum: Role,
    example: Role.TOURIST,
  })
  role: Role

  @ApiProperty({
    description: 'Account active status',
    example: true,
  })
  isActive: boolean

  @ApiProperty({
    description: 'User profile details (Tourist or Employee)',
    required: false,
  })
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
  @ApiProperty({
    description: 'Tourist profile ID',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  id: string;

  @ApiProperty({
    description: 'Tourist full name',
    example: 'John Doe',
  })
  fullName: string;

  @ApiProperty({
    description: 'Identity card number',
    example: '3174012345678901',
  })
  identityNumber: string;

  @ApiProperty({
    description: 'Tourist address',
    example: 'Jl. Malioboro No. 123, Yogyakarta',
  })
  address: string

  @ApiProperty({
    description: 'Tourist phone number',
    example: '+628123456789',
  })
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
  @ApiProperty({
    description: 'Employee profile ID',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  id: string;

  @ApiProperty({
    description: 'Employee full name',
    example: 'Jane Smith',
  })
  fullName: string;

  @ApiProperty({
    description: 'Employee code',
    example: 'EMP-2024-001',
  })
  employeeCode: string;

  @ApiProperty({
    description: 'Employee phone number',
    example: '+628123456789',
  })
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