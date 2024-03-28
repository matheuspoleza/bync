import { Module } from '@nestjs/common';
import { BelvoService } from './belvo.service';
import { WebhooksController } from './webhooks.controller';
import { BelvoController } from './belvo.controller';
import { BelvoGateway } from './infrastructure/belvo.gateway';
import { BankingModule } from '../banking/banking.module';

@Module({
  imports: [BankingModule],
  controllers: [BelvoController, WebhooksController],
  providers: [BelvoService, BelvoGateway],
})
export class BelvoModule {}
