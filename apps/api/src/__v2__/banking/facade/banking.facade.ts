import { BankingService } from '../application/banking.service';
import { BankingAccountAdapter } from '../adapters/banking-account.adapter';

export class BankingFacade {
  constructor(private readonly bankingService: BankingService) {}

  async setupAccounts(
    bankingAccountAdapter: BankingAccountAdapter,
  ): Promise<void> {
    this.bankingService.setupAccounts();
  }
}
