import { Inject, Injectable } from '@nestjs/common';

import { BankAccountLinkRepository } from '../../../infrastructure/repositories/bank-account-link.repository';
import { BankAccountRepository } from '../../../infrastructure/repositories/bank-account.repository';
import { BankingAccountDto } from '../dto/banking-account.dto';
import { BankingAccount } from '../domain/banking-account';
import {
  ConnectionLink,
  ConnectionLinkStatus,
  IConnectionLinkRepository,
} from '../domain/connection-link';

@Injectable()
export class BankingService {
  constructor(
    private bankAccountsRepository: BankAccountRepository,
    private bankAccountLinkRepository: BankAccountLinkRepository,
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

  async setupAccounts(accountsDto: BankingAccountDto[]) {
    const link = await this.bankAccountLinkRepository.getOne(linkID);
    const bankingAccounts = accountsDto.map(
      (account) => new BankingAccount(account),
    );
    await this.bankAccountsRepository.createMany(bankingAccounts);

    // update link status to CONNECTED if status is pending. If is ERROR ignore
    link.connect();

    await this.bankAccountLinkRepository.update(link);
  }

  async getAccounts(customerID: string) {
    // get all accounts for given customerID
    console.log({ customerID });
  }
}
