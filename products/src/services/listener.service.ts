import { Injectable } from '@nestjs/common';
import { Stan, SubscriptionOptions, connect } from 'node-nats-streaming';
import { OrderCancelledListener } from 'src/events/user-created';

@Injectable()
export class SubscriberService {
  private stan: Stan;

  constructor() {
    this.stan = this.initStan();
  }

  private initStan(): Stan {
    const stan = connect('ticketing', 'subscriber', {
      url: 'nats://nats-srv:4222', // Update with your NATS server URL
    });

    stan.on('connect', () => {
      console.log('Subscriber connected to NATS');

      const options: SubscriptionOptions = stan
        .subscriptionOptions()
        .setManualAckMode(true);

      const subscription = stan.subscribe('userCreated', options);
      new OrderCancelledListener(stan).listen();

      subscription.on('message', (msg) => {
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
