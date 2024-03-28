import { Module } from '@nestjs/common';
import { BankingController } from './api/banking.controller';
import { BankingService } from './application/banking.service';
import { BankingFacade } from './banking.facade';
import { IConnectionLinkRepository } from './domain/connection-link';
import { ConnectionLinkRepository } from './infra/connection-link.repository';
import { IBankAccountRepository } from './domain/bank-account';
import { BankAccountRepository } from './infra/bank-account.repository';

@Module({
  imports: [],
  controllers: [BankingController],
  providers: [
    BankingService,
    BankingFacade,
    {
      provide: IConnectionLinkRepository,
      useClass: ConnectionLinkRepository,
    },
    {
      provide: IBankAccountRepository,
      useClass: BankAccountRepository,
    },
  ],
})
export class BankingModule {}
