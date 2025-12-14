import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import type { RequestWithJwtPayload } from 'src/auth/interface/request.interface';
import { CreateUserTouristProfileRequestDto } from './dto/create-user-tourist-profile-request.dto';
import { UserResponseDto } from './dto/user-profile-response.dto';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Role } from './enum/user-role.enum';
import { Roles } from 'src/auth/decorator/user-role.decorator';
import { UpdateUserTouristProfileRequestDto } from './dto/update-user-tourist-profile-request.dto';
import { UpdateUserEmployeeProfileRequestDto } from './dto/update-user-employee-profile-request.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // USER TOURIST PROFILE MANAGEMENT
  @Post('/profile/tourist')
  @UseGuards(RolesGuard)
  @Roles(Role.TOURIST)
  async createMyTouristProfile(
    @Req() req: RequestWithJwtPayload,
    @Body() dto: CreateUserTouristProfileRequestDto
  ): Promise<UserResponseDto> {
    const userId = req.user.id
    return await this.userService.createTouristProfile(userId, dto)
  }

  @Patch('profile/tourist')
  @UseGuards(RolesGuard)
  @Roles(Role.TOURIST)
  async updateMyTouristProfile(
    @Req() req: RequestWithJwtPayload,
    @Body() dto: UpdateUserTouristProfileRequestDto
  ): Promise<UserResponseDto> {
    const userId = req.user.id
    return await this.userService.updateEmployeeProfile(userId, dto)
  }

  @Get('profile')
  async getMyProfile(@Req() req: RequestWithJwtPayload): Promise<UserResponseDto> {
    const userId = req.user.id
    const user = await this.userService.findUserById(userId)
    return UserResponseDto.fromUser(user)
  }

  // ADMIN EMPLOYEE MANAGEMENT
  @Patch('employee/:id/profile')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async updateEmployeeProfile(
    @Param('id') employeeId: string,
    @Body() dto: UpdateUserEmployeeProfileRequestDto
  ): Promise<UserResponseDto> {
    return await this.userService.updateEmployeeProfile(employeeId, dto)
  }

  @Get('employees')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getAllEmployees(): Promise<UserResponseDto[]> {
    return this.userService.findAllEmployees()
  }

  @Get('employee/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getEmployeeById(
    @Param('id') id: string
  ): Promise<UserResponseDto> {
    return this.userService.findEmployeeById(id)
  }

  // ADMIN BERKUASA

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.findAllEmployees()
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getUserById(
    @Param('id') id: string
  ): Promise<UserResponseDto> {
    return this.userService.findUserByIdWithResponseDto(id)
  }

  @Patch(':id/toggle-status')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async toggleUserStatus(
    @Param('id') id: string
  ): Promise<UserResponseDto>{
    return this.userService.toggleUserStatus(id)
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async deleteUser(
    @Param('id') id: string
  ): Promise<{message: string}> {
    await this.userService.deleteUser(id)
    return {
      message: `user with id: ${id} deleted successfully`
    }
  }
}
