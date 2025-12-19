import { ApiProperty } from '@nestjs/swagger';
import { User } from "src/user/entity/user.entity"
import { Role } from "src/user/enum/user-role.enum"

export class LocalStrategyValidatedResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string

  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
  })
  username: string

  @ApiProperty({
    description: 'User email address',
    example: 'tourist@gmail.com',
  })
  email: string

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
  @ApiProperty({
    description: 'User unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string

  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
  })
  username: string

  @ApiProperty({
    description: 'User email address',
    example: 'tourist@gmail.com',
  })
  email: string

  @ApiProperty({
    description: 'JWT access token (valid for 15 minutes)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string

  @ApiProperty({
    description: 'JWT refresh token (valid for 7 days)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string

  @ApiProperty({
    description: 'Account active status',
    example: true,
  })
  isActive: boolean

  @ApiProperty({
    description: 'Success message',
    example: 'user with email tourist@gmail.com successfully logged in',
  })
  message: string

  static fromValidateLocalStrategyAndTokens(
    user: LocalStrategyValidatedResponseDto,
    accessToken: string,
    refreshToken: string
  ): LoginUserResponseDto {

    const dto = new LoginUserResponseDto()

    dto.id = user.id
    dto.username = user.username
    dto.email = user.email
    dto.accessToken = accessToken
    dto.refreshToken = refreshToken
    dto.message =  `user with email ${user.email} successfully logged in`

    return dto
  }
}

export class RegisterUserResponseDto {

  @ApiProperty({
    description: 'User unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string

  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
  })
  username: string

  @ApiProperty({
    description: 'User email address',
    example: 'tourist@gmail.com',
  })
  email: string

  @ApiProperty({
    description: 'Success message',
    example: 'User with email tourist@gmail.com and username johndoe successfully created',
  })
  message: string

  static fromUser(user: User): RegisterUserResponseDto {
    const dto = new RegisterUserResponseDto();

    dto.id = user.id
    dto.username = user.username
    dto.email = user.email
    dto.message = `User with email ${user.email} and username ${user.username} successfully created`
    return dto;
  }
}