import { Module } from '@nestjs/common';
import { ISessionRepository } from './domain/session';
import { SessionRepository } from './infra/session.repository';
import { CollectorService } from './application/collector.service';
import { BankingModule } from 'src/banking/banking.module';
import { IBankingFacade } from './domain/banking';
import { BankingFacade } from 'src/banking/banking.facade';
import { CollectorFacade } from './collector.facade';

@Module({
  imports: [BankingModule],
  providers: [
    CollectorService,
    {
      provide: ISessionRepository,
      useClass: SessionRepository
    },
    {
      provide: IBankingFacade,
      useClass: BankingFacade
    }
  ],
  exports: [CollectorFacade]
})
export class CollectorModule {}
