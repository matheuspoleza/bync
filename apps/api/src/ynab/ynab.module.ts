import { Module } from '@nestjs/common';
import { YnabController } from './ynab.controller';
import { YnabAccountRepository } from './infra/ynab-account.repository';
import { YnabIntegration } from './infra/ynab.gateway';
import { YnabService } from './ynab.service';

@Module({
  controllers: [YnabController],
  providers: [YnabService, YnabAccountRepository, YnabIntegration],
})
export class YnabModule {}
