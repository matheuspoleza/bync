import { BankingService } from './application/banking.service';
import { BankingAccountAdapter } from './adapters/banking-account.adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BankingFacade {
  constructor(private readonly bankingService: BankingService) {}

  async setupAccounts(
    bankingAccountAdapter: BankingAccountAdapter,
  ): Promise<void> {
    await this.bankingService.setupAccounts(
      bankingAccountAdapter.getAccounts(),
    );
  }
}
