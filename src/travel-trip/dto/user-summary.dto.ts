import { User } from 'src/user/entity/user.entity';
import { Role } from 'src/user/enum/user-role.enum';

export class UserSummaryDto {
  id: string;
  username: string;
  email: string;
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