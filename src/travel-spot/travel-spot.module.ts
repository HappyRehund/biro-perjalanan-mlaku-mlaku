import { Module } from '@nestjs/common';
import { TravelSpotService } from './travel-spot.service';
import { TravelSpotController } from './travel-spot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelSpot } from './entity/travel-spot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TravelSpot])
  ],
  controllers: [TravelSpotController],
  providers: [TravelSpotService],
  exports: [TravelSpotService]
})
export class TravelSpotModule {}
