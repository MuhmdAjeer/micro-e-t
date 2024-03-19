import { Injectable, Logger } from '@nestjs/common';
import { PublisherService } from './services/publisher.service';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { User } from './entities/User';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    private readonly publisherService: PublisherService,
    private readonly em: EntityManager,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
  ) {}

  async getHello(): Promise<string> {
    this.publisherService.publishEvent('userCreated', { name: 'ajeer' });
    this.publisherService.publishEvent('order:cancelled', {
      order: '32324323242332432',
    });
    const x = this.userRepo.create({
      email: '43243',
      // id: 42432423,
      username: '432432',
    });
    this.em.persist(x);
    const users = await this.userRepo.findAll();
    this.logger.log(users);
    return 'Hello World Microservices! usersd';
  }
}
