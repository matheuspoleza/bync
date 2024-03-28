import { Inject, Injectable } from '@nestjs/common';

import {
  ConnectionLink,
  ConnectionLinkStatus,
  IConnectionLinkRepository,
} from '../domain/connection-link';
import { BankAccountRepository } from '../infra/bank-account.repository';
import { BankAccountDto } from './bank-account.dto';
import { BankAccount, IBankAccountRepository } from '../domain/bank-account';

@Injectable()
export class BankingService {
  constructor(
    @Inject(IBankAccountRepository)
    private bankAccountsRepository: IBankAccountRepository,
    @Inject(IConnectionLinkRepository)
    private readonly connectionLinkRepository: IConnectionLinkRepository,
  ) {}

  async createBankingConnection(
    customerID: string,
    linkID: string,
    institution: string,
  ): Promise<ConnectionLink> {
    const connectionLink = new ConnectionLink({
      customerID,
      linkID,
      status: ConnectionLinkStatus.PENDING,
      institution,
    });

    return this.connectionLinkRepository.create(connectionLink);
  }

  async setupAccounts(linkId: string, accountsDto: BankAccountDto[]) {
    const connectionLink = await this.connectionLinkRepository.getOne(linkId);
    connectionLink.connect();
    await this.connectionLinkRepository.update(connectionLink);

    const bankAccounts = accountsDto.map(
      (account) =>
        new BankAccount({
          type: account.type,
          accountName: account.name,
          number: account.number,
          balance: account.balance,
          customerId: connectionLink.customerID,
          institution: account.institution,
          connectionLink,
        }),
    );

    await this.bankAccountsRepository.createMany(bankAccounts);
  }

  async getAccounts(customerID: string) {
    // get all accounts for given customerID
    console.log({ customerID });
  }
}
