import { Module } from '@nestjs/common';
import { BankingController } from './api/banking.controller';
import { BankingService } from './application/banking.service';
import { BankingFacade } from './banking.facade';
import { IConnectionLinkRepository } from './domain/connection-link';
import { ConnectionLinkRepository } from './infra/connection-link.repository';
import { IBankAccountRepository } from './domain/bank-account';
import { BankAccountRepository } from './infra/bank-account.repository';
import { BelvoModule } from 'src/belvo/belvo.module';

@Module({
  imports: [BelvoModule],
  controllers: [BankingController],
  providers: [
    BankingService,
    BankingFacade,
    ConnectionLinkRepository,
    {
      provide: IConnectionLinkRepository,
      useClass: ConnectionLinkRepository,
    },
    {
      provide: IBankAccountRepository,
      useClass: BankAccountRepository,
    },
  ],
  exports: [BankingFacade, ConnectionLinkRepository],
})
export class BankingModule {}
