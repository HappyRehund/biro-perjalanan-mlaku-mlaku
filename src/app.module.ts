import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TravelSpotModule } from './travel-spot/travel-spot.module';
import { TravelPackageModule } from './travel-package/travel-package.module';
import { TravelTripModule } from './travel-trip/travel-trip.module';

@Module({
  imports: [AuthModule, UserModule, TravelSpotModule, TravelPackageModule, TravelTripModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
