import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BankingModule } from './banking/banking.module';
import { BelvoModule } from './belvo/belvo.module';
import { CommonModule } from './common/common.module';
import { IdentityModule } from './identity/identity.module';
import { SyncModule } from './sync/sync.module';
import { YnabModule } from './ynab/ynab.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAMES } from './app.constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BankingModule,
    BelvoModule,
    CommonModule,
    IdentityModule,
    SyncModule,
    YnabModule,
    AuthModule,
    ...Object.values(QUEUE_NAMES).map(name => BullModule.registerQueue({ name })),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/signup').forRoutes('*');
  }
}
