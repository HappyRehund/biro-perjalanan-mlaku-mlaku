import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelSpotService } from './travel-spot.service';
import { CreateTravelSpotDto } from './dto/create-travel-spot.dto';
import { UpdateTravelSpotDto } from './dto/update-travel-spot.dto';

@Controller('travel-spot')
export class TravelSpotController {
  constructor(private readonly travelSpotService: TravelSpotService) {}

  @Post()
  create(@Body() createTravelSpotDto: CreateTravelSpotDto) {
    return this.travelSpotService.create(createTravelSpotDto);
  }

  @Get()
  findAll() {
    return this.travelSpotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelSpotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelSpotDto: UpdateTravelSpotDto) {
    return this.travelSpotService.update(+id, updateTravelSpotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelSpotService.remove(+id);
  }
}
