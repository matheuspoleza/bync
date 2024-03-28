import { Injectable } from '@nestjs/common';

import { BankingService } from './application/banking.service';
import { BankAccountDto } from './application/bank-account.dto';

export interface BankAccountAdapter {
  getAccounts(): BankAccountDto[];
}

@Injectable()
export class BankingFacade {
  constructor(private readonly bankingService: BankingService) {}

  async setupAccounts(bankAccountAdapter: BankAccountAdapter): Promise<void> {
    await this.bankingService.setupAccounts(bankAccountAdapter.getAccounts());
  }
}
