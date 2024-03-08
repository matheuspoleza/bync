import { Injectable } from '@nestjs/common';
import { YnabAccountRepository } from '../infrastructure/ynab-account.repository';
import { BankAccountRepository } from '../infrastructure/bank-account.repository';
import { YnabIntegration } from '../infrastructure/ynab/ynab.integration';

@Injectable()
export class YnabService {
  constructor(
    private ynabAccountRepository: YnabAccountRepository,
    private bankAccountRepository: BankAccountRepository,
    private ynabIntegration: YnabIntegration,
  ) {}

  async authorizeBudgetAccess(
    customerID: string,
    redirectURL: string,
    authCode: string,
  ) {
    await this.ynabIntegration.authorize(customerID, {
      redirectURL,
      authCode,
    });

    await this.ynabIntegration.getAllBudgetsAccounts(customerID);
  }

  async connectYnabAccountWithBankAccount(
    ynabAccountID: string,
    bankAccountID: string,
  ) {
    const ynabAccount = await this.ynabAccountRepository.getByID(ynabAccountID);
    const bankAccount = await this.bankAccountRepository.getByID(bankAccountID);

    if (!ynabAccount) {
      throw new Error('Ynab account not found');
    }

    if (!bankAccount) {
      throw new Error('Bank account not found');
    }

    ynabAccount.createConnectionWith(bankAccount);

    await this.ynabAccountRepository.update(ynabAccount);
  }
}
