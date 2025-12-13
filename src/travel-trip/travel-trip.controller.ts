import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelTripService } from './travel-trip.service';
import { CreateTravelTripDto } from './dto/create-travel-trip.dto';
import { UpdateTravelTripDto } from './dto/update-travel-trip.dto';

@Controller('travel-trip')
export class TravelTripController {
  constructor(private readonly travelTripService: TravelTripService) {}

  @Post()
  create(@Body() createTravelTripDto: CreateTravelTripDto) {
    return this.travelTripService.create(createTravelTripDto);
  }

  @Get()
  findAll() {
    return this.travelTripService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelTripService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelTripDto: UpdateTravelTripDto) {
    return this.travelTripService.update(+id, updateTravelTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelTripService.remove(+id);
  }
}
