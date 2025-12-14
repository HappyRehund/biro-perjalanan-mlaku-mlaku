import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelSpotService } from './travel-spot.service';

@Controller('travel-spot')
export class TravelSpotController {
  constructor(private readonly travelSpotService: TravelSpotService) {}

}
