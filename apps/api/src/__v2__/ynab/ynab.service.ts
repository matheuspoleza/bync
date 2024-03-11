import { Injectable } from '@nestjs/common';
import { YnabAccountRepository } from './infra/ynab-account.repository';
import { YnabIntegration } from './infra/ynab/ynab.integration';
import { BankAccount } from './domain/bank-account';

@Injectable()
export class YnabService {
  constructor(
    private readonly ynabIntegration: YnabIntegration,
    private readonly ynabAccountRepository: YnabAccountRepository,
  ) {}

  async connectWithBankAccount(
    ynabAccountID: string,
    bankAccount: BankAccount,
  ) {
    const ynabAccount = await this.ynabAccountRepository.getByID(ynabAccountID);

    if (!ynabAccount) {
      throw new Error('Ynab account not found');
    }

    ynabAccount.createConnectionWith(bankAccount);

    await this.ynabAccountRepository.update(ynabAccount);
  }

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
}
