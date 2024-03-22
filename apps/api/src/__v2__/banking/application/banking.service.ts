import { Injectable } from '@nestjs/common';

import { BankAccountLinkRepository } from '../../../infrastructure/repositories/bank-account-link.repository';
import { BankAccountRepository } from '../../../infrastructure/repositories/bank-account.repository';
import { BankingAccountDto } from '../dto/banking-account.dto';
import { BankingAccount } from '../domain/banking-account';

@Injectable()
export class BankingService {
  constructor(
    private bankAccountsRepository: BankAccountRepository,
    private bankAccountLinkRepository: BankAccountLinkRepository,
  ) {}

  async createLink(linkID: string, institution: string) {
    // create all links
    // bank account link should be on pending (domain logic)
    console.log({ linkID, institution });
  }

  async setupAccounts(accountsDto: BankingAccountDto[]) {
    const link = await this.bankAccountLinkRepository.getOne(linkID);
    const bankAccounts = accountsDto.map(
      (account) => new BankingAccount({ ...account, link }),
    );
    await this.bankAccountsRepository.createMany(bankAccounts);

    // update link status to CONNECTED if status is pending. If is ERROR ignore
    link.connect();

    await this.bankAccountLinkRepository.update(link);
  }

  async getAccounts(customerID: string) {
    // get all accounts for given customerID
    console.log({ customerID });
  }
}
