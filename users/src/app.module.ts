import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsModule } from './modules/nats.module';
import { SubscriberService } from './services/listener.service';
import { PublisherService } from './services/publisher.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../mikro-orm.config';
import { User } from './entities/User'; // Make sure to import your entity class

@Module({
  imports: [
    NatsModule,
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature({ entities: [User] }),
  ],
  controllers: [AppController],
  providers: [AppService, SubscriberService, PublisherService],
})
export class AppModule {}
