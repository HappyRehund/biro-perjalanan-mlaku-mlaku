import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelPackage } from './entity/travel-package.entity';
import { PackageItinerary } from './entity/package-itinerary.entity';
import { DataSource, Repository } from 'typeorm';
import { TravelSpotService } from 'src/travel-spot/travel-spot.service';

@Injectable()
export class TravelPackageService {

  constructor(
    @InjectRepository(TravelPackage)
    private readonly travelPackageRepository: Repository<TravelPackage>,
    @InjectRepository(PackageItinerary)
    private readonly itineraryRepo: Repository<PackageItinerary>,
    private readonly travelSpotService: TravelSpotService,
    private readonly dataSource: DataSource
  ){}


}
