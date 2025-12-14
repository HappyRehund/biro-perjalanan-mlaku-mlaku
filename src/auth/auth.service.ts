import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LocalStrategyValidatedResponseDto, LoginUserResponseDto, RegisterUserResponseDto } from './dto/auth-user-response.dto';
import { RegisterUserEmployeeRequestDto, RegisterUserTouristRequestDto } from './dto/register-user-request.dto';
import * as bcrypt from "bcrypt"
import { Role } from 'src/user/enum/user-role.enum';
import { JwtPayloadData } from './interface/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ){}

  async registerUserTourist(registerUserTouristDto: RegisterUserTouristRequestDto): Promise<RegisterUserResponseDto> {
    const hashedPassword = await bcrypt.hash(registerUserTouristDto.password, 10)
    const newTouristUser = await this.userService.createTouristUser({
      email: registerUserTouristDto.email,
      username: registerUserTouristDto.username,
      password: hashedPassword
    })

    return RegisterUserResponseDto.fromUser(newTouristUser)
  }

  async registerUserEmployee(registerUserEmployeeDto: RegisterUserEmployeeRequestDto): Promise<RegisterUserResponseDto> {
    const hashedPassword = await bcrypt.hash(registerUserEmployeeDto.password, 10)

    const newUserEmployee = await this.userService.createEmployeeUserWithProfile({
      email: registerUserEmployeeDto.email,
      username: registerUserEmployeeDto.username,
      password: hashedPassword,
      employeeProfile: registerUserEmployeeDto.profile
    })

    return RegisterUserResponseDto.fromUser(newUserEmployee)
  }

  async validateUser(email: string, password: string): Promise<LocalStrategyValidatedResponseDto> {
    const user = await this.userService.findUserByEmail(email)

    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (user && isCorrectPassword ){
      return LocalStrategyValidatedResponseDto.fromUser(user)
    } else {
      throw new UnauthorizedException("Username atau password salah")
    }
  }

  async login(user: LocalStrategyValidatedResponseDto): Promise<LoginUserResponseDto>{

    const tokens = await this.generateTokens(user.id, user.username, user.email, user.role, user.isActive)

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken)

    return LoginUserResponseDto.fromValidateLocalStrategyAndTokens(user, tokens.accessToken, tokens.refreshToken)
  }

  async generateTokens(id: string, username: string, email: string, role: Role, isActive: boolean): Promise<{ accessToken: string, refreshToken: string }> {
    const payload: JwtPayloadData = {
      id,
      username,
      email,
      role,
      isActive
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        payload,
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION')
        }
      ),

      this.jwtService.signAsync(
        payload,
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION')
        }
      )
    ]);

    return { accessToken, refreshToken };
  }

  async generateAccessToken(id: string, username: string, email: string, role: Role, isActive: boolean): Promise<string> {
    const payload: JwtPayloadData = {
      id,
      username,
      email,
      role,
      isActive
    }

    return await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION')
    })
  }

  async updateRefreshTokenHash(id: string, refreshToken: string){
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
    await this.userService.updateUserRefreshToken(id, hashedRefreshToken)
  }

  async refreshToken(id: string, refreshToken: string){

    const user = await this.userService.findUserByIdWithHashedRT(id)

    if(!user || !user.hashedRefreshToken) throw new ForbiddenException('Access Denied')

    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.hashedRefreshToken)

    if(!refreshTokenMatches) throw new ForbiddenException('Access Denied')

    const accessToken = await this.generateAccessToken(user.id, user.username, user.email, user.role, user.isActive)

    return {
      accessToken,
      refreshToken
    }
  }
}
