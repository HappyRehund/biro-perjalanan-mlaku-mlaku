import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserTouristProfile } from './entity/user-tourist-profle.entity';
import { UserEmployeeProfile } from './entity/user-employee-profile.entity';
import { CreateUserTouristProfileRequestDto } from './dto/create-user-tourist-profile-request.dto';
import { UpdateUserTouristProfileRequestDto } from './dto/update-user-tourist-profile-request.dto';
import { CreateUserEmployeeProfileRequestDto } from './dto/create-user-employee-profile-request.dto';
import { Role } from './enum/user-role.enum';
import { UpdateUserEmployeeProfileRequestDto } from './dto/update-user-employee-profile-request.dto';
import { UserResponseDto } from './dto/user-profile-response.dto';

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

  async updateUserRefreshToken(id: string, hashedRefreshToken: string){
    const user = await this.findUserById(id)
    user.hashedRefreshToken = hashedRefreshToken
    await this.userRepository.save(user)
  }

  // EMPLOYEE PROFILE SERVICE - Hanya update karena craete profile sekaligus register
  async updateEmployeeProfile(employeeUserId: string, dto: UpdateUserEmployeeProfileRequestDto): Promise<UserResponseDto> {
    const userEmployee = await this.userRepository.findOne({
      where: { id: employeeUserId },
      relations: ['userEmployeeProfile']
    })

    if (!userEmployee) {
      throw new NotFoundException('User employee tidak ditemukan')
    }

    if (userEmployee.role !== Role.EMPLOYEE) {
      throw new ConflictException('User bukan employee');
    }

    if (!userEmployee.userEmployeeProfile) {
      throw new NotFoundException('Employee profile tidak ditemukan');
    }

    if (dto.employeeCode) {
      const existingEmployee = await this.userEmployeeProfileRepository.findOne({
        where: { employeeCode: dto.employeeCode }
      });

      if (existingEmployee && existingEmployee.id !== userEmployee.userEmployeeProfile.id) {
        throw new ConflictException(`Employee code ${dto.employeeCode} sudah digunakan`);
      }
    }

    if (dto.fullName !== undefined) userEmployee.userEmployeeProfile.fullName = dto.fullName;
    if (dto.employeeCode !== undefined) userEmployee.userEmployeeProfile.employeeCode = dto.employeeCode;
    if (dto.phoneNumber !== undefined) userEmployee.userEmployeeProfile.phoneNumber = dto.phoneNumber;

    const updatedUserEmployee =  await this.userRepository.save(userEmployee);
    return UserResponseDto.fromUser(updatedUserEmployee)
  }

  // TOURIST PROFILE SERVICE
  async createTouristProfile(userId: string, dto: CreateUserTouristProfileRequestDto): Promise<UserResponseDto> {
    const userTourist = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userTouristProfile']
    });

    if (!userTourist) {
      throw new NotFoundException('User tidak ditemukan');
    }

    if (userTourist.role !== Role.TOURIST) {
      throw new ConflictException('User bukan tourist');
    }

    if (userTourist.userTouristProfile) {
      throw new ConflictException('Profile tourist sudah ada');
    }

    const profile = this.userTouristProfileRepository.create({
      ...dto,
      user: userTourist
    });

    const savedUserTouristProfile = await this.userTouristProfileRepository.save(profile);

    userTourist.userTouristProfile = savedUserTouristProfile

    return UserResponseDto.fromUser(userTourist)
  }

  async updateTouristProfile(userId: string, dto: UpdateUserTouristProfileRequestDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userTouristProfile']
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    if (user.role !== Role.TOURIST) {
      throw new ConflictException('User bukan tourist');
    }

    if (!user.userTouristProfile) {
      throw new NotFoundException('Profile tourist belum dibuat, buat terlebih dahulu');
    }

    if (dto.fullName !== undefined) user.userTouristProfile.fullName = dto.fullName;
    if (dto.identityNumber !== undefined) user.userTouristProfile.identityNumber = dto.identityNumber;
    if (dto.address !== undefined) user.userTouristProfile.address = dto.address;
    if (dto.phoneNumber !== undefined) user.userTouristProfile.phoneNumber = dto.phoneNumber;

    const updatedUserTourist = await this.userRepository.save(user);
    return UserResponseDto.fromUser(updatedUserTourist)
  }

  // USER STATUS UPDATE (SIAPA TAU KEPAKAI)
  async toggleUserStatus(userId: string): Promise<UserResponseDto> {
    const user = await this.findUserById(userId)
    user.isActive = !user.isActive
    const toggledUser = await this.userRepository.save(user);
    return UserResponseDto.fromUser(toggledUser)
  }

  // DELETE
  async deleteUser(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userTouristProfile', 'userEmployeeProfile']
    })

    if(!user){
      throw new NotFoundException('User tidak ditemukan')
    }

    await this.userRepository.remove(user);
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

  async findUserByIdWithResponseDto(id: string): Promise<UserResponseDto> {
    const user = await this.findUserById(id)
    return UserResponseDto.fromUser(user)
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

  async findUserByIdWithProfile(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneOrFail({
      where: {
        id
      },
      relations: ['userTouristProfile', 'userEmployeeProfile'],
    })


    return UserResponseDto.fromUser(user)
  }

  async findAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({
      relations: ['userTouristProfile', 'userEmployeeProfile'],
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        isActive: true
      }
    })

    return UserResponseDto.fromUsers(users)
  }

  async findAllTourists(): Promise<UserResponseDto[]> {
    const tourists = await this.userRepository.find({
      where: {
        role: Role.TOURIST
      },
      relations: ['userTouristProfile'],
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        isActive: true
      }
    })

    return UserResponseDto.fromUsers(tourists)
  }

  async findAllEmployees(): Promise<UserResponseDto[]> {
    const employees = await this.userRepository.find({
      where: {
        role: Role.EMPLOYEE
      },
      relations: ['userEmployeeProfile'],
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        isActive: true
      }
    })

    return UserResponseDto.fromUsers(employees)
  }

  async findEmployeeById(id: string): Promise<UserResponseDto> {
    const user = await this.findUserById(id);

    if (user.role !== Role.EMPLOYEE) {
      throw new ConflictException('User bukan employee')
    }

    return UserResponseDto.fromUser(user)
  }

}
