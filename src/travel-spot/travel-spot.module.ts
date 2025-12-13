import { Module } from '@nestjs/common';
import { TravelSpotService } from './travel-spot.service';
import { TravelSpotController } from './travel-spot.controller';

@Module({
  controllers: [TravelSpotController],
  providers: [TravelSpotService],
})
export class TravelSpotModule {}
