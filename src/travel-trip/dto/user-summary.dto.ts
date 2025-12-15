import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
import { Role } from 'src/user/enum/user-role.enum';

export class UserSummaryDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    description: 'User email address',
    example: 'tourist@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'User role',
    enum: Role,
    example: Role.TOURIST,
  })
  role: Role;

  static fromUser(user: User): UserSummaryDto {
    const dto = new UserSummaryDto();
    dto.id = user.id;
    dto.username = user.username;
    dto.email = user.email;
    dto.role = user.role;
    return dto;
  }
}