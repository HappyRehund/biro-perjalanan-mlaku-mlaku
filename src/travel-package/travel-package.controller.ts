import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelPackageService } from './travel-package.service';


@Controller('travel-package')
export class TravelPackageController {
  constructor(private readonly travelPackageService: TravelPackageService) {}

}
