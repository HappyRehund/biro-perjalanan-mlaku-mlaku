import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelPackageService } from './travel-package.service';
import { CreateTravelPackageDto } from './dto/create-travel-package.dto';
import { UpdateTravelPackageDto } from './dto/update-travel-package.dto';

@Controller('travel-package')
export class TravelPackageController {
  constructor(private readonly travelPackageService: TravelPackageService) {}

  @Post()
  create(@Body() createTravelPackageDto: CreateTravelPackageDto) {
    return this.travelPackageService.create(createTravelPackageDto);
  }

  @Get()
  findAll() {
    return this.travelPackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelPackageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelPackageDto: UpdateTravelPackageDto) {
    return this.travelPackageService.update(+id, updateTravelPackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelPackageService.remove(+id);
  }
}
