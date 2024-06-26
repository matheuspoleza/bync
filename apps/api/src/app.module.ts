import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BankingModule } from './banking/banking.module';
import { BelvoModule } from './belvo/belvo.module';
import { CommonModule } from './common/common.module';
import { IdentityModule } from './identity/identity.module';
import { SyncModule } from './sync/sync.module';
import { YnabModule } from './ynab/ynab.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_: ConfigService) => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
    BankingModule,
    BelvoModule,
    CommonModule,
    IdentityModule,
    SyncModule,
    YnabModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/signup').forRoutes('*');
  }
}
