import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam,  } from '@nestjs/swagger';
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

@ApiTags('users')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // USER TOURIST PROFILE MANAGEMENT
  @Get('tourist')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @ApiOperation({
    summary: 'Get all tourists',
    description: 'Retrieve list of all tourist users with their profiles. Only accessible by Admin and Employee.'
  })
  async getAllTourists(): Promise<UserResponseDto[]> {
    return this.userService.findAllTourists()
  }

  @Post('tourist')
  @UseGuards(RolesGuard)
  @Roles(Role.TOURIST)
  @ApiOperation({
    summary: 'Create my tourist profile',
    description: 'Create tourist profile for authenticated user. Only accessible by users with Tourist role.'
  })
  async createMyTouristProfile(
    @Req() req: RequestWithJwtPayload,
    @Body() dto: CreateUserTouristProfileRequestDto
  ): Promise<UserResponseDto> {
    const userId = req.user.id
    return await this.userService.createTouristProfile(userId, dto)
  }

  @Patch('tourist')
  @UseGuards(RolesGuard)
  @Roles(Role.TOURIST)
  @ApiOperation({
    summary: 'Update my tourist profile',
    description: 'Update tourist profile for authenticated user.'
  })
  async updateMyTouristProfile(
    @Req() req: RequestWithJwtPayload,
    @Body() dto: UpdateUserTouristProfileRequestDto
  ): Promise<UserResponseDto> {
    const userId = req.user.id
    return await this.userService.updateTouristProfile(userId, dto)
  }

  @Get('profile')
  @ApiOperation({
    summary: 'Get my profile',
    description: 'Retrieve authenticated user profile with role-specific details.'
  })
  async getMyProfile(@Req() req: RequestWithJwtPayload): Promise<UserResponseDto> {
    const userId = req.user.id
    return await this.userService.findUserByIdWithProfile(userId)
  }

  // ADMIN EMPLOYEE MANAGEMENT
  @Patch('employee/:id/profile')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Update employee profile',
    description: 'Update employee profile by ID. Only accessible by Admin.'
  })
  @ApiParam({
    name: 'id',
    description: 'Employee user UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  async updateEmployeeProfile(
    @Param('id', ParseUUIDPipe) employeeId: string,
    @Body() dto: UpdateUserEmployeeProfileRequestDto
  ): Promise<UserResponseDto> {
    return await this.userService.updateEmployeeProfile(employeeId, dto)
  }

  @Get('employee')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Get all employees',
    description: 'Retrieve list of all employee users. Only accessible by Admin.'
  })
  async getAllEmployees(): Promise<UserResponseDto[]> {
    return this.userService.findAllEmployees()
  }

  @Get('employee/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Get employee by ID',
    description: 'Retrieve employee details by ID. Only accessible by Admin.'
  })
  @ApiParam({
    name: 'id',
    description: 'Employee user UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  async getEmployeeById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<UserResponseDto> {
    return this.userService.findEmployeeById(id)
  }

  // ADMIN BERKUASA
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve list of all users (Admin, Employee, Tourist). Only accessible by Admin.'
  })
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.findAllUsers()
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve user details by ID. Only accessible by Admin.'
  })
  @ApiParam({
    name: 'id',
    description: 'User UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<UserResponseDto> {
    return this.userService.findUserByIdWithResponseDto(id)
  }

  @Patch(':id/toggle-status')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Toggle user active status',
    description: 'Enable or disable user account. Only accessible by Admin.'
  })
  @ApiParam({
    name: 'id',
    description: 'User UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  async toggleUserStatus(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<UserResponseDto>{
    return this.userService.toggleUserStatus(id)
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete user',
    description: 'Permanently delete user account. Only accessible by Admin.'
  })
  @ApiParam({
    name: 'id',
    description: 'User UUID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  async deleteUser(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<{message: string}> {
    await this.userService.deleteUser(id)
    return {
      message: `user with id: ${id} deleted successfully`
    }
  }
}