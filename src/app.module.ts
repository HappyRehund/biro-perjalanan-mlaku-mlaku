import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TravelSpotModule } from './travel-spot/travel-spot.module';
import { TravelPackageModule } from './travel-package/travel-package.module';
import { TravelTripModule } from './travel-trip/travel-trip.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => typeOrmConfig(configService)
    }),
    AuthModule,
    UserModule,
    TravelSpotModule,
    TravelPackageModule,
    TravelTripModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
