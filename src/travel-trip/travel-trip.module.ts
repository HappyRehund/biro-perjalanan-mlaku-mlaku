import { Module } from '@nestjs/common';
import { TravelTripService } from './travel-trip.service';
import { TravelTripController } from './travel-trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelTrip } from './entity/travel-trip.entity';
import { TravelPackageModule } from 'src/travel-package/travel-package.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TravelTrip]),
    UserModule,
    TravelPackageModule
  ],
  controllers: [TravelTripController],
  providers: [TravelTripService],
})
export class TravelTripModule {}
