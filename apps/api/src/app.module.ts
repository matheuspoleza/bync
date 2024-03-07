import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CollectService } from './application/collect.service';
import { CollectorRepository } from './infrastructure/repositories/collector.repository';
import { MobilisAPIV1, MobilisAPIV2 } from './infrastructure/mobilis';
import { MobilisWeb } from './infrastructure/mobilis/web';
import { MobilisRepository } from './infrastructure/mobilis/mobilis.repository';
import { BankAccountRepository } from './infrastructure/repositories/bank-account.repository';
import { DatabaseService, RedisService } from './infrastructure/database';
import { CustomerRepository } from './infrastructure/repositories/customer.repository';
import { SessionRepository } from './infrastructure/repositories/session.repository';
import { PublishService } from './application/publish.service';
import { ConfigModule } from '@nestjs/config';
import { CollectorSessionRepository } from './infrastructure/repositories/collector-session.repository';
import { YNABRepository } from './infrastructure/ynab/ynab.repository';
import { PlatformsService } from './infrastructure/platforms.service';
import { BelvoService } from './infrastructure/belvo/belvo.service';
import { SyncController } from './presentation/sync.controller';
import { BankingController } from './presentation/banking.controller';
import { BudgetsController } from './presentation/budgets.controller';
import { BankingService } from './application/banking.service';
import { BankAccountLinkRepository } from './infrastructure/repositories/bank-account-link.repository';
import { CustomerController } from './presentation/customer.controller';
import { CustomerService } from './application/customer.service';
import { AuthMiddleware } from './presentation/common/auth.middeware';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.UPSTASH_REDIS_HOST,
        port: 42909,
      },
    }),
    BullModule.registerQueue({
      name: 'ynab',
    }),
  ],
  providers: [
    CollectService,
    CollectorRepository,
    CollectorSessionRepository,
    YNABRepository,
    PlatformsService,
    MobilisAPIV1,
    MobilisAPIV2,
    MobilisWeb,
    MobilisRepository,
    BankAccountRepository,
    DatabaseService,
    RedisService,
    CustomerRepository,
    SessionRepository,
    PublishService,
    BelvoService,
    BankingService,
    BankAccountLinkRepository,
    CustomerRepository,
    CustomerService,
  ],
  controllers: [
    SyncController,
    BankingController,
    BudgetsController,
    CustomerController,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
