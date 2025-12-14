import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelSpot } from './entity/travel-spot.entity';
import { Repository } from 'typeorm';
import { CreateTravelSpotRequestDto } from './dto/create-travel-spot-request.dto';
import { TravelSpotResponseDto } from './dto/travel-spot-response.dto';

@Injectable()
export class TravelSpotService {
  constructor(
    @InjectRepository(TravelSpot)
    private readonly travelSpotRepository: Repository<TravelSpot>
  ){}


}
