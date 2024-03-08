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

    const accounts = await this.ynabIntegration.getAllForCustomer(customerID);

    await Promise.all(
      accounts.map((account) => this.ynabAccountRepository.create(account)),
    );
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
