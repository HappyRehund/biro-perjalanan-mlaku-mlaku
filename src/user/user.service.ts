import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserTouristProfile } from './entity/user-tourist-profle.entity';
import { UserEmployeeProfile } from './entity/user-employee-profile.entity';
import { CreateUserTouristProfileRequestDto } from './dto/create-user-tourist-profile-request.dto';
import { UserEmployeeProfileResponseDto, UserTouristProfileResponseDto } from './dto/user-profile-response.dto';
import { UpdateUserTouristProfileRequestDto } from './dto/update-user-tourist-profile-request.dto';
import { CreateUserEmployeeProfileRequestDto } from './dto/create-user-employee-profile-request.dto';
import { Role } from './enum/user-role.enum';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserTouristProfile)
    private readonly userTouristProfileRepository: Repository<UserTouristProfile>,
    @InjectRepository(UserEmployeeProfile)
    private readonly userEmployeeProfileRepository: Repository<UserEmployeeProfile>,
    @InjectDataSource()
    private readonly dataSource: DataSource
  ){}

  // AUTH DEPENDENCIES
  async createTouristUser( dto: {
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

  async createEmployeeUserWithProfile(dto: {
    email: string
    username: string
    password: string
    employeeProfile: CreateUserEmployeeProfileRequestDto
  }): Promise<User> {
    return await this.dataSource.transaction(async (manager) => {

      const existingUser = await manager.findOne(User, {
        where: [
          { email: dto.email },
          { username: dto.username }
        ]
      })

      if (existingUser) {
        if (existingUser.email === dto.email) {
          throw new ConflictException(`User dengan email ${dto.email} sudah ada`);
        }
        if (existingUser.username === dto.username) {
          throw new ConflictException(`User dengan username ${dto.username} sudah ada`);
        }
      }

      const existingEmployee = await manager.findOne(UserEmployeeProfile, {
        where: { employeeCode: dto.employeeProfile.employeeCode }
      })

      if (existingEmployee) {
        throw new ConflictException(`Employee code sudah dipakai`)
      }

      const user = manager.create(User, {
        email: dto.email,
        username: dto.username,
        password: dto.password,
        role: Role.EMPLOYEE
      })

      const savedUserEmployee = await manager.save(User, user)

      const profile = manager.create(UserEmployeeProfile, {
        fullName: dto.employeeProfile.fullName,
        employeeCode: dto.employeeProfile.employeeCode,
        phoneNumber: dto.employeeProfile.phoneNumber,
        user: savedUserEmployee
      })

      const savedUserEmployeeProfile = await manager.save(UserEmployeeProfile, profile)
      savedUserEmployee.userEmployeeProfile = savedUserEmployeeProfile

      return savedUserEmployee
    })
  }

    // UPDATE REFRESH TOKEN
  async updateUserRefreshToken(id: string, hashedRefreshToken: string){
    const user = await this.findUserById(id)
    user.hashedRefreshToken = hashedRefreshToken
    await this.userRepository.save(user)
  }

  // EMPLOYEE PROFILE SERVICE - Hanya update karena craete profile sekaligus register


  // TOURIST PROFILE SERVICE
  async createTouristProfile(userId: string, dto: CreateUserTouristProfileRequestDto): Promise<UserTouristProfileResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userTouristProfile']
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    if (user.userTouristProfile) {
      throw new ConflictException('Profile tourist sudah ada');
    }

    const profile = this.userTouristProfileRepository.create({
      ...dto,
      user: user
    });

    await this.userTouristProfileRepository.save(profile);

    return UserTouristProfileResponseDto.fromUserTouristProfile(profile)
  }

  async updateTouristProfile(userId: string, dto: UpdateUserTouristProfileRequestDto): Promise<UserTouristProfileResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userTouristProfile']
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    if (!user.userTouristProfile) {
      throw new NotFoundException('Profile tourist belum dibuat, buat terlebih dahulu');
    }

    if (dto.fullName !== undefined) user.userTouristProfile.fullName = dto.fullName;
    if (dto.identityNumber !== undefined) user.userTouristProfile.identityNumber = dto.identityNumber;
    if (dto.address !== undefined) user.userTouristProfile.address = dto.address;
    if (dto.phoneNumber !== undefined) user.userTouristProfile.phoneNumber = dto.phoneNumber;

    const updatedUser = await this.userRepository.save(user);
    return UserTouristProfileResponseDto.fromUserTouristProfile(updatedUser.userTouristProfile)
  }

  // SEMUA JENIS FIND ADA DISINI
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
