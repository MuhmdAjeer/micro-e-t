import { Injectable } from '@nestjs/common';
import { Stan, connect } from 'node-nats-streaming';

@Injectable()
export class PublisherService {
  private stan: Stan;

  constructor() {
    this.stan = this.initStan();
  }

  private initStan(): Stan {
    const stan = connect('ticketing', 'products', {
      url: 'nats://nats-srv:4222', // Update with your NATS server URL
    });

    stan.on('connect', () => {
      console.log('Publisher connected to NATS');
    });

    stan.on('error', (err) => {
      console.error('NATS connection error:', err);
    });

    return stan;
  }

  async publishEvent(event: string, data: any): Promise<void> {
    const eventData = JSON.stringify(data);

    this.stan.publish(event, eventData, (err, guid) => {
      if (err) {
        console.error('Failed to publish event:', err);
      } else {
        console.log('Event published with GUID:', guid);
      }
    });
  }
}
