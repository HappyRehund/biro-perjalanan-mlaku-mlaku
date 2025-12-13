import { Injectable } from '@nestjs/common';
import { CreateTravelTripDto } from './dto/create-travel-trip.dto';
import { UpdateTravelTripDto } from './dto/update-travel-trip.dto';

@Injectable()
export class TravelTripService {
  create(createTravelTripDto: CreateTravelTripDto) {
    return 'This action adds a new travelTrip';
  }

  findAll() {
    return `This action returns all travelTrip`;
  }

  findOne(id: number) {
    return `This action returns a #${id} travelTrip`;
  }

  update(id: number, updateTravelTripDto: UpdateTravelTripDto) {
    return `This action updates a #${id} travelTrip`;
  }

  remove(id: number) {
    return `This action removes a #${id} travelTrip`;
  }
}
