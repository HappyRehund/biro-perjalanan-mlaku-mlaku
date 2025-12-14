import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelTripService } from './travel-trip.service';

@Controller('travel-trip')
export class TravelTripController {
  constructor(private readonly travelTripService: TravelTripService) {}

}
