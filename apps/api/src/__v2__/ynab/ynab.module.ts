import { Module } from '@nestjs/common';
import { YnabController } from './presentation/ynab.controller';
import { YnabService } from './application/ynab.service';
import { YnabAccountRepository } from './infrastructure/ynab-account.repository';
import { YnabIntegration } from './infrastructure/ynab/ynab.integration';

@Module({
  controllers: [YnabController],
  providers: [YnabService, YnabAccountRepository, YnabIntegration],
})
export class YnabModule {}
