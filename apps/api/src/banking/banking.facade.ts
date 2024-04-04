import { Injectable } from '@nestjs/common';

import { BankingService } from './application/banking.service';
import { BankAccountDto, BankAccountType, CreateBankAccountDto } from './application/bank-account.dto';

export interface BankAccountAdapter {
  getLinkId(): string;
  getAccounts(): CreateBankAccountDto[];
}

@Injectable()
export class BankingFacade {
  constructor(private readonly bankingService: BankingService) {}

  async setupAccounts(bankAccountAdapter: BankAccountAdapter): Promise<void> {
    await this.bankingService.setupAccounts(
      bankAccountAdapter.getLinkId(),
      bankAccountAdapter.getAccounts(),
    );
  }

  async getAllLinkedAccounts(): Promise<BankAccountDto[]> {
    const bankAccounts = await this.bankingService.getAllLinkedAccounts();

    const bankAccountDtos = bankAccounts.map<BankAccountDto>((bankAccount) => ({
      id: bankAccount.id,
      customerId: bankAccount.customerId,
      link: bankAccount.connectionLinkId,
      name: bankAccount.name,
      number: bankAccount.number,
      institution: bankAccount.institution,
      type: bankAccount.type as BankAccountType,
      balance: bankAccount.balance
    }));

    return bankAccountDtos;
  }
}
