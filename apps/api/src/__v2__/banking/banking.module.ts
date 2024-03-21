import { Module } from '@nestjs/common';
import { BankingController as BankingControllerEvents } from './banking.controller';
import { BankingController } from './presentation/banking.controller';

@Module({
  imports: [],
  controllers: [BankingController, BankingControllerEvents],
})
export class BankingModule {}
