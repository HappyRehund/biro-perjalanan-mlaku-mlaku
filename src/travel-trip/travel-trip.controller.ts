import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  ParseUUIDPipe
} from '@nestjs/common';
import { TravelTripService } from './travel-trip.service';
import { CreateTravelTripRequestDto } from './dto/create-travel-trip-request.dto';
import { UpdateTravelTripRequestDto } from './dto/update-travel-trip-request.dto';
import { TravelTripResponseDto } from './dto/travel-trip-response.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorator/user-role.decorator';
import { Role } from 'src/user/enum/user-role.enum';
import type { RequestWithJwtPayload } from 'src/auth/interface/request.interface';

@Controller('travel-trip')
@UseGuards(JwtAuthGuard)
export class TravelTripController {
  constructor(private readonly travelTripService: TravelTripService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @HttpCode(HttpStatus.CREATED)
  async createTrip(
    @Body() dto: CreateTravelTripRequestDto
  ): Promise<TravelTripResponseDto> {
    return await this.travelTripService.createTravelTrip(dto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async getAllTrips(): Promise<TravelTripResponseDto[]> {
    return await this.travelTripService.findAllTrips();
  }

  @Get('upcoming')
  async getUpcomingTrips(): Promise<TravelTripResponseDto[]> {
    return await this.travelTripService.findUpcomingTrips();
  }

  @Get('ongoing')
  async getOngoingTrips(): Promise<TravelTripResponseDto[]> {
    return await this.travelTripService.findOngoingTrips();
  }

  @Get('completed')
  async getCompletedTrips(): Promise<TravelTripResponseDto[]> {
    return await this.travelTripService.findCompletedTrips();
  }

  @Get('my-trips')
  @UseGuards(RolesGuard)
  @Roles(Role.TOURIST)
  async getMyTrips(
    @Req() req: RequestWithJwtPayload
  ): Promise<TravelTripResponseDto[]> {
    return await this.travelTripService.findTripsByTourist(req.user.id);
  }

  @Get('my-assignments')
  @UseGuards(RolesGuard)
  @Roles(Role.EMPLOYEE, Role.ADMIN)
  async getMyAssignments(
    @Req() req: RequestWithJwtPayload
  ): Promise<TravelTripResponseDto[]> {
    return await this.travelTripService.findTripsByEmployee(req.user.id);
  }

  @Get('tourist/:touristId')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async getTripsByTourist(
    @Param('touristId', ParseUUIDPipe) touristId: string
  ): Promise<TravelTripResponseDto[]> {
    return await this.travelTripService.findTripsByTourist(touristId);
  }

  @Get('employee/:employeeId')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getTripsByEmployee(
    @Param('employeeId', ParseUUIDPipe) employeeId: string
  ): Promise<TravelTripResponseDto[]> {
    return await this.travelTripService.findTripsByEmployee(employeeId);
  }

  @Get('package/:packageId')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async getTripsByPackage(
    @Param('packageId', ParseUUIDPipe) packageId: string
  ): Promise<TravelTripResponseDto[]> {
    return await this.travelTripService.findTripsByPackage(packageId);
  }

  @Get(':id')
  async getTripById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<TravelTripResponseDto> {
    return await this.travelTripService.findTripById(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async updateTrip(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTravelTripRequestDto
  ): Promise<TravelTripResponseDto> {
    return await this.travelTripService.updateTrip(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  async deleteTrip(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<{ message: string }> {
    await this.travelTripService.deleteTrip(id);
    return {
      message: `Trip dengan id ${id} berhasil dihapus`
    };
  }
}