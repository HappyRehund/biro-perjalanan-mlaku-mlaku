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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

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

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Authenticate user with email and password. Returns access token and refresh token.'
  })
  @ApiBody({
    description: 'User credentials',
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'tourist@gmail.com',
          description: 'User email address'
        },
        password: {
          type: 'string',
          example: 'Tourist@123',
          description: 'User password',
          minLength: 8
        }
      }
    }
  })
  async login(@Req() req: RequestPassedValidation): Promise<LoginUserResponseDto>{
    return this.authService.login(req.user)
  }

  @UseGuards(JwtRtAuthGuard)
  @Post('refresh')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    description: 'Get new access token using refresh token -> Put Refresh Token (Not Access Token) in the Authorization header'
  })
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