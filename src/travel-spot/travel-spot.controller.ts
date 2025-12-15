import { TravelSpotService } from './travel-spot.service';
import { CreateTravelSpotRequestDto } from './dto/create-travel-spot-request.dto';
import { UpdateTravelSpotRequestDto } from './dto/update-travel-spot-request.dto';
import { TravelSpotResponseDto } from './dto/travel-spot-response.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorator/user-role.decorator';
import { Role } from 'src/user/enum/user-role.enum';
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('travel-spots')
@Controller('travel-spot')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TravelSpotController {
  constructor(private readonly travelSpotService: TravelSpotService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async create(
    @Body() dto: CreateTravelSpotRequestDto
  ): Promise<TravelSpotResponseDto> {
    return await this.travelSpotService.createTravelSpot(dto);
  }

  @Get()
  async findAll(): Promise<TravelSpotResponseDto[]> {
    return await this.travelSpotService.findAllTravelSpots();
  }

  @Get('search')
  async search(
    @Query('q') searchTerm: string
  ): Promise<TravelSpotResponseDto[]> {
    if (!searchTerm || searchTerm.trim() === '') {
      throw new BadRequestException('Search term tidak boleh kosong');
    }
    return await this.travelSpotService.searchTravelSpots(searchTerm);
  }

  @Get('city/:city')
  async findByCity(
    @Param('city') city: string
  ): Promise<TravelSpotResponseDto[]> {
    if (!city || city.trim() === '') {
      throw new BadRequestException('City tidak boleh kosong');
    }
    return await this.travelSpotService.findTravelSpotsByCity(city);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTravelSpotRequestDto
  ): Promise<TravelSpotResponseDto> {
    return await this.travelSpotService.updateTravelSpot(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.travelSpotService.deleteTravelSpot(id);
    return {
      message: `Travel spot dengan id ${id} berhasil dihapus`
    };
  }
}