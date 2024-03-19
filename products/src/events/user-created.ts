import {
  Listener,
  OrderCancelledEvent,
  Subjects,
} from '../utils/base-listener';
import { Message } from 'node-nats-streaming';
import { Logger } from '@nestjs/common';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  private readonly logger = new Logger(OrderCancelledListener.name);
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = 'queename';

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    this.logger.log('received', data);
    msg.ack();
  }
}
