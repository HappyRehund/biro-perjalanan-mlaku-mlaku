import { Controller, Get, Post, Body, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserEmployeeRequestDto, RegisterUserTouristRequestDto } from './dto/register-user-request.dto';
import { RegisterUserResponseDto, LoginUserResponseDto } from './dto/auth-user-response.dto';
import type { RequestPassedValidation, RequestWithRefreshToken } from './interface/request.interface';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtRtAuthGuard } from './guard/jwt-rt-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/role.guard';
import { Roles } from './decorator/user-role.decorator';
import { Role } from 'src/user/enum/user-role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ){}

  @Post('register')
  async registerTourist(@Body() registerUserTouristDto: RegisterUserTouristRequestDto ): Promise<RegisterUserResponseDto> {
    return await this.authService.registerUserTourist(registerUserTouristDto)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('admin/register-employee')
  @ApiBearerAuth('JWT-auth')
  async registerEmployee(@Body() registerUserEmployeeDto: RegisterUserEmployeeRequestDto): Promise<RegisterUserResponseDto> {
    return await this.authService.registerUserEmployee(registerUserEmployeeDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestPassedValidation): Promise<LoginUserResponseDto>{
    return this.authService.login(req.user)
  }

  @UseGuards(JwtRtAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: RequestWithRefreshToken): Promise<{ accessToken: string, refreshToken: string}>{
    const id = req.user.id
    const refreshToken = req.user.refreshToken

    return await this.authService.refreshToken(id, refreshToken)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @Get('test')
  getTest(): { message: string }{
    return {
      message: "Test Role Guard Berhasil"
    }
  }
}