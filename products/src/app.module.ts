import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsModule } from './modules/nats.module';
import { SubscriberService } from './services/listener.service';
import { PublisherService } from './services/publisher.service';

@Module({
  imports: [NatsModule],
  controllers: [AppController],
  providers: [AppService, SubscriberService, PublisherService],
})
export class AppModule {}
