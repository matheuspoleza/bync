import { Injectable } from '@nestjs/common';
import { YnabAccountRepository } from '../infra/ynab-account.repository';
import { YnabIntegration } from '../infra/ynab.gateway';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { YnabAccountLinked } from '../domain/ynab-account-linked';

@Injectable()
export class YnabService {
  constructor(
    private readonly ynabIntegration: YnabIntegration,
    private readonly ynabAccountRepository: YnabAccountRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createBankAccountLink(ynabAccountId: string, bankAccountID: string) {
    const ynabAccount = await this.ynabAccountRepository.getOneById(
      ynabAccountId,
    );

    if (!ynabAccount) {
      throw new Error('Ynab account not found');
    }

    ynabAccount.link(bankAccountID);

    await this.ynabAccountRepository.update(ynabAccount);

    this.eventEmitter.emit('ynab.account-linked', {
      ynabAccountId,
      bankAccountID,
    } as YnabAccountLinked);
  }

  async authorizeBudgetAccess(
    customerId: string,
    redirectURL: string,
    authCode: string,
  ) {
    await this.ynabIntegration.authorize(customerId, {
      redirectURL,
      authCode,
    });

    const accounts = await this.ynabIntegration.getAllForCustomer(customerId);

    console.log('YNAB ACCOUNTS', { accounts });

    await Promise.all(
      accounts.map((account) => this.ynabAccountRepository.create(account)),
    );
  }

  async getAllForCustomer(customerId: string) {
    return this.ynabAccountRepository.getAllForCustomer(customerId);
  }
}
