import { Module } from '@nestjs/common';
import { BelvoService } from './application/belvo.service';
import { WebhooksController } from './api/webhooks.controller';
import { BelvoGateway } from './infrastructure/belvo.gateway';
import { BelvoFacade } from './belvo.facade';

@Module({
  controllers: [WebhooksController],
  providers: [BelvoService, BelvoFacade, BelvoGateway],
  exports: [BelvoFacade],
})
export class BelvoModule {}
