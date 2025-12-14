
import { TravelPackageService } from './travel-package.service';
import { CreateTravelPackageRequestDto } from './dto/create-travel-package-request.dto';
import { UpdateTravelPackageRequestDto } from './dto/update-travel-package-request.dto';
import { CreateItineraryRequestDto } from './dto/create-itinerary-request.dto';
import { UpdateItineraryRequestDto } from './dto/update-itinerary-request.dto';
import { TravelPackageResponseDto } from './dto/travel-package-response.dto';
import { ItineraryResponseDto } from './dto/itinerary-response.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorator/user-role.decorator';
import { Role } from 'src/user/enum/user-role.enum';
import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, HttpStatus, Param, ParseBoolPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';

@Controller('travel-package')
@UseGuards(JwtAuthGuard)
export class TravelPackageController {
  constructor(private readonly travelPackageService: TravelPackageService) {}

  // Travel Package
  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async createTravelPackage(
    @Body() dto: CreateTravelPackageRequestDto
  ): Promise<TravelPackageResponseDto> {
    return await this.travelPackageService.createTravelPackage(dto);
  }

  @Get()
  async findAllTravelPackages(
    @Query('includeItineraries', new DefaultValuePipe(false), ParseBoolPipe)
    includeItineraries: boolean
  ): Promise<TravelPackageResponseDto[]> {
    return await this.travelPackageService.findAllTravelPackages(includeItineraries);
  }

  @Get(':id')
  async findTravelPackage(
    @Param('id') id: string,
    @Query('includeItineraries', new DefaultValuePipe(true), ParseBoolPipe)
    includeItineraries: boolean
  ): Promise<TravelPackageResponseDto> {
    return await this.travelPackageService.findTravelPackageById(id, includeItineraries);
  }


  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async updateTravelPackage(
    @Param('id') id: string,
    @Body() dto: UpdateTravelPackageRequestDto
  ): Promise<TravelPackageResponseDto> {
    return await this.travelPackageService.updateTravelPackage(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  async deleteTravelPackage(@Param('id') id: string): Promise<{ message: string }> {
    await this.travelPackageService.deleteTravelPackage(id);
    return {
      message: `Travel package dengan id ${id} berhasil dihapus`
    };
  }

  // Itinerary Endpoints
  @Post(':packageId/itinerary')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async addItinerary(
    @Param('packageId') packageId: string,
    @Body() dto: CreateItineraryRequestDto
  ): Promise<ItineraryResponseDto> {
    return await this.travelPackageService.addItinerary(packageId, dto);
  }

  @Get(':packageId/itinerary')
  async getItineraries(
    @Param('packageId') packageId: string
  ): Promise<ItineraryResponseDto[]> {
    return await this.travelPackageService.getItinerariesByPackage(packageId);
  }

  @Get(':packageId/itinerary/:itineraryId')
  async getItinerary(
    @Param('packageId') packageId: string,
    @Param('itineraryId') itineraryId: string
  ): Promise<ItineraryResponseDto> {
    return await this.travelPackageService.getItineraryById(packageId, itineraryId);
  }

  @Patch(':packageId/itinerary/:itineraryId')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async updateItinerary(
    @Param('packageId') packageId: string,
    @Param('itineraryId') itineraryId: string,
    @Body() dto: UpdateItineraryRequestDto
  ): Promise<ItineraryResponseDto> {
    return await this.travelPackageService.updateItinerary(packageId, itineraryId, dto);
  }

  @Delete(':packageId/itinerary/:itineraryId')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @HttpCode(HttpStatus.OK)
  async removeItinerary(
    @Param('packageId') packageId: string,
    @Param('itineraryId') itineraryId: string
  ): Promise<{ message: string }> {
    await this.travelPackageService.deleteItinerary(packageId, itineraryId);
    return {
      message: `Itinerary dengan id ${itineraryId} berhasil dihapus`
    };
  }
}