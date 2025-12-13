import { Injectable } from '@nestjs/common';
import { CreateTravelPackageDto } from './dto/create-travel-package.dto';
import { UpdateTravelPackageDto } from './dto/update-travel-package.dto';

@Injectable()
export class TravelPackageService {
  create(createTravelPackageDto: CreateTravelPackageDto) {
    return 'This action adds a new travelPackage';
  }

  findAll() {
    return `This action returns all travelPackage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} travelPackage`;
  }

  update(id: number, updateTravelPackageDto: UpdateTravelPackageDto) {
    return `This action updates a #${id} travelPackage`;
  }

  remove(id: number) {
    return `This action removes a #${id} travelPackage`;
  }
}
