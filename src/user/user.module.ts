import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserTouristProfile } from './entity/user-tourist-profle.entity';
import { UserEmployeeProfile } from './entity/user-employee-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserTouristProfile, UserEmployeeProfile])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
