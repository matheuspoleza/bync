import { Injectable } from '@nestjs/common';
import { YnabAccountRepository } from './infra/ynab-account.repository';
import { YnabIntegration } from './infra/ynab/ynab.integration';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { YnabAccountLinked } from './domain/ynab-account-linked';

@Injectable()
export class YnabService {
  constructor(
    private readonly ynabIntegration: YnabIntegration,
    private readonly ynabAccountRepository: YnabAccountRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createBankAccountLink(ynabAccountID: string, bankAccountID: string) {
    const ynabAccount = await this.ynabAccountRepository.getByID(ynabAccountID);

    if (!ynabAccount) {
      throw new Error('Ynab account not found');
    }

    ynabAccount.link(bankAccountID);

    await this.ynabAccountRepository.update(ynabAccount);

    this.eventEmitter.emit('ynab.account-linked', {
      ynabAccountID,
      bankAccountID,
    } as YnabAccountLinked);
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

  async getAllForCustomer(customerID: string) {
    return this.ynabAccountRepository.getAllForCustomer(customerID);
  }
}
