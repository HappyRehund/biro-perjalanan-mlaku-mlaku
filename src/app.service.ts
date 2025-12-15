import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): string {
    return 'Biro Perjalanan Mlaku - Mlaku App';
  }
}
