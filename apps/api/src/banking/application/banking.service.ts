import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  ConnectionLink,
  ConnectionLinkStatus,
  IConnectionLinkRepository,
} from '../domain/connection-link';
import { BankAccount, IBankAccountRepository } from '../domain/bank-account';
import { OnEvent } from '@nestjs/event-emitter';
import { AccountsConnected } from '../domain/accounts-connected';
import { BankAccountDto } from './bank-account.dto';

@Injectable()
export class BankingService {
  constructor(
    @Inject(IBankAccountRepository)
    private bankAccountsRepository: IBankAccountRepository,
    @Inject(IConnectionLinkRepository)
    private readonly connectionLinkRepository: IConnectionLinkRepository,
  ) {}

  async linkBankAccount(bankAccountId: string, ynabAccountId: string) {
    const bankAccount =
      await this.bankAccountsRepository.getOneById(bankAccountId);

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found');
    }

    bankAccount.link(ynabAccountId);

    await this.bankAccountsRepository.updateBankAccountLink(bankAccount);
  }

  async createBankingConnection(
    customerId: string,
    linkId: string,
    institution: string,
  ): Promise<ConnectionLink> {
    const existingConnectionLink =
      await this.connectionLinkRepository.getByLinkId(linkId);

    if (existingConnectionLink) {
      throw new ConflictException('Connection link already exists');
    }

    const connectionLink = new ConnectionLink({
      customerId,
      linkId,
      status: ConnectionLinkStatus.PENDING,
      institution,
    });

    return this.connectionLinkRepository.create(connectionLink);
  }

  @OnEvent(AccountsConnected.EventName)
  async handleAccountsConnected(linkId: string, accountsDto: BankAccountDto[]) {
    const connectionLink =
      await this.connectionLinkRepository.getByLinkId(linkId);

    if (!connectionLink) {
      throw new NotFoundException('Connection link not found');
    }

    connectionLink.connect();

    await this.connectionLinkRepository.updateStatus(connectionLink);

    const bankAccounts = accountsDto.map(
      (account) =>
        new BankAccount({
          type: account.type,
          accountName: account.name,
          number: account.number,
          balance: account.balance,
          customerId: connectionLink.customerId,
          institution: account.institution,
          connectionLink,
        }),
    );

    await this.bankAccountsRepository.createMany(bankAccounts);
  }

  async getAccounts(customerId: string) {
    return this.bankAccountsRepository.getAllForCustomer(customerId);
  }

  async getAllByIds(bankAccountIds: string[]) {
    return this.bankAccountsRepository.getAllByIds(bankAccountIds);
  }

  async getAllLinkedAccountsForCustomer(customerId: string) {
    return this.bankAccountsRepository.getAllLinkedAccountsForCustomer(
      customerId,
    );
  }
}
