import { Module } from '@nestjs/common';
import { BankingController } from './banking.controller';
import { BankingService } from './application/banking.service';
import { BankingFacade } from './banking.facade';

@Module({
  imports: [],
  controllers: [BankingController],
  providers: [BankingService, BankingFacade],
})
export class BankingModule {}
