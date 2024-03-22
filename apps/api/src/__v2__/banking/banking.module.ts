import { Module } from '@nestjs/common';
import { BankingController } from './banking.controller';
import { BankingService } from './application/banking.service';

@Module({
  imports: [],
  controllers: [BankingController],
  providers: [BankingService],
})
export class BankingModule {}
