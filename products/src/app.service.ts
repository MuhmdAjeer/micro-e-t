import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello(data: any): string {
    this.logger.log('from products, received an event!!!', data);
    return data + '';
  }
}
