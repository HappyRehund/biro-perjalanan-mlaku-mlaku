import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserTouristProfile } from './entity/user-tourist-profle.entity';
import { UserEmployeeProfile } from './entity/user-employee-profile.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserTouristProfile)
    private readonly userTouristProfileRepository: Repository<UserTouristProfile>,
    @InjectRepository(UserEmployeeProfile)
    private readonly userEmployeeProfileRepository: Repository<UserEmployeeProfile>,
  ){}

  // CREATE
  async createUser( dto: {
    email: string
    username: string
    password: string
  }): Promise<User> {

    const existingUser = await this.userRepository.findOne({
      where: [
        { email: dto.email },
        { username: dto.username }
      ]
    })

    if (existingUser) {
      if (existingUser.email === dto.email) {
        throw new ConflictException(`User dengan email ${existingUser.email} sudah ada`);
      }
      if (existingUser.username === dto.username) {
        throw new ConflictException(`User dengan nama ${existingUser.username} sudah ada`);
      }
    }

    const newUser = this.userRepository.create(dto)
    return await this.userRepository.save(newUser)
  }

  // UPDATE
  async updateUserRefreshToken(id: string, hashedRefreshToken: string){
    const user = await this.findUserById(id)
    user.hashedRefreshToken = hashedRefreshToken
    await this.userRepository.save(user)
  }

  // READ
  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy(
      {
        id: id
      }
    )
    if(!user){
      throw new UnauthorizedException('user with this id not exists')
    }
    return user
  }

  async findUserByIdWithHashedRT(id: string): Promise<User> {
    const user = await this.userRepository.findOne(
      {
        where: {
          id
        },
        select: ['id', 'username', 'email', 'role', 'hashedRefreshToken', 'isActive']
      }
    )
    if (!user){
      throw new UnauthorizedException(`user not exists`)
    }

    return user
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy(
      {
        email: email
      }
    )
    if (!user){
      throw new UnauthorizedException(`user with email ${email} not exists`)
    }

    return user
  }


}
