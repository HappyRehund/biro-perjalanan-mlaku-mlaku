import { Module } from '@nestjs/common';
import { TravelTripService } from './travel-trip.service';
import { TravelTripController } from './travel-trip.controller';

@Module({
  controllers: [TravelTripController],
  providers: [TravelTripService],
})
export class TravelTripModule {}
