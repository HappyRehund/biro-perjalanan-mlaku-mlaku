import { Injectable } from '@nestjs/common';
import { CreateTravelSpotDto } from './dto/create-travel-spot.dto';
import { UpdateTravelSpotDto } from './dto/update-travel-spot.dto';

@Injectable()
export class TravelSpotService {
  create(createTravelSpotDto: CreateTravelSpotDto) {
    return 'This action adds a new travelSpot';
  }

  findAll() {
    return `This action returns all travelSpot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} travelSpot`;
  }

  update(id: number, updateTravelSpotDto: UpdateTravelSpotDto) {
    return `This action updates a #${id} travelSpot`;
  }

  remove(id: number) {
    return `This action removes a #${id} travelSpot`;
  }
}
