import { Module } from '@nestjs/common';
import { BankingController } from './banking.controller';
import { BankingService } from './application/banking.service';
import { BankingFacade } from './banking.facade';
import { IConnectionLinkRepository } from './domain/connection-link';
import { ConnectionLinkRepository } from './infra/connection-link.repository';

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
  ],
})
export class BankingModule {}
