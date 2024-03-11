import { Module } from '@nestjs/common';
import { YnabController } from './ynab.controller';
import { YnabAccountRepository } from './infra/ynab-account.repository';
import { YnabIntegration } from './infra/ynab/ynab.integration';
import { YnabService } from './ynab.service';
import { YnabFacade } from './ynab.facade';

@Module({
  controllers: [YnabController],
  providers: [YnabService, YnabAccountRepository, YnabIntegration],
  exports: [YnabFacade],
})
export class YnabModule {}
