import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserRequestDto } from './dto/register-user-request.dto';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';
import type { RequestPassedValidation, RequestWithRefreshToken } from './interface/request.interface';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtRtAuthGuard } from './guard/jwt-rt-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/role.guard';
import { Roles } from './decorator/user-role.decorator';
import { Role } from 'src/user/enum/user-role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ){}

  @Post('register')
  async register(@Body() registerUserDto:RegisterUserRequestDto ): Promise<RegisterUserResponseDto> {
    return await this.authService.registerUser(registerUserDto)
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