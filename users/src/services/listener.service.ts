import { Injectable } from '@nestjs/common';
import {
  Message,
  Stan,
  SubscriptionOptions,
  connect,
} from 'node-nats-streaming';

@Injectable()
export class SubscriberService {
  private stan: Stan;

  constructor() {
    this.stan = this.initStan();
  }

  private initStan(): Stan {
    const stan = connect('ticketing', 'users', {
      url: 'nats://nats-srv:4222', // Update with your NATS server URL
    });

    stan.on('connect', () => {
      console.log('Subscriber connected to NATS');

      const options: SubscriptionOptions = stan
        .subscriptionOptions()
        .setManualAckMode(true);

      const subscription = stan.subscribe('productAdded', options);

      subscription.on('message', (msg: Message) => {
        console.log('Received message:', msg.getData());
        // Handle the received event data here

        // Acknowledge the message
        // msg.ack();
        msg.ack();
      });

      subscription.on('error', (err) => {
        console.error('Subscription error:', err);
      });
    });

    stan.on('error', (err) => {
      console.error('NATS connection error:', err);
    });

    return stan;
  }
}
