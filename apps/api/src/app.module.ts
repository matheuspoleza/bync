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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    BankingModule,
    BelvoModule,
    CommonModule,
    IdentityModule,
    SyncModule,
    YnabModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('identity/customer', 'auth')
      .forRoutes('*');
  }
}
