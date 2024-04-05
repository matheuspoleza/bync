import { Module } from '@nestjs/common';
import { SessionRepository } from './infra/session.repository';
import { CollectorJob } from './application/collector.job';
import { BankingModule } from 'src/banking/banking.module';
import { CollectorFacade } from './collector.facade';

@Module({
  imports: [BankingModule],
  providers: [CollectorJob, CollectorFacade, SessionRepository],
  exports: [CollectorFacade],
})
export class CollectorModule {}
