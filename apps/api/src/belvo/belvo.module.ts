import { Module } from '@nestjs/common';
import { BelvoService } from './application/belvo.service';
import { WebhooksController } from './api/webhooks.controller';
import { BelvoController } from './api/belvo.controller';
import { BelvoGateway } from './infrastructure/belvo.gateway';
import { BankingModule } from '../banking/banking.module';

@Module({
  imports: [BankingModule],
  controllers: [BelvoController, WebhooksController],
  providers: [BelvoService, BelvoGateway],
  exports: [BelvoGateway]
})
export class BelvoModule {}
