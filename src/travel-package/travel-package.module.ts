import { Module } from '@nestjs/common';
import { TravelPackageService } from './travel-package.service';
import { TravelPackageController } from './travel-package.controller';

@Module({
  controllers: [TravelPackageController],
  providers: [TravelPackageService],
})
export class TravelPackageModule {}
