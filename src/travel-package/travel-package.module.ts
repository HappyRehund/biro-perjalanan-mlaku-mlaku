import { Module } from '@nestjs/common';
import { TravelPackageService } from './travel-package.service';
import { TravelPackageController } from './travel-package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelPackage } from './entity/travel-package.entity';
import { PackageItinerary } from './entity/package-itinerary.entity';
import { TravelSpotModule } from 'src/travel-spot/travel-spot.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TravelPackage, PackageItinerary]),
    TravelSpotModule
  ],
  controllers: [TravelPackageController],
  providers: [TravelPackageService],
  exports: [TravelPackageService]
})
export class TravelPackageModule {}
