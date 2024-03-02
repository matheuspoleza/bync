import { Injectable } from '@nestjs/common';
import { BankAccount } from 'src/domain/bank-account';
import { BankAccountLinkStatus, LinkDTO } from 'src/domain/bank-account-link';
import { BelvoService } from 'src/infrastructure/belvo/belvo.service';
import { BankAccountLinkRepository } from 'src/infrastructure/repositories/bank-account-link.repository';
import { BankAccountRepository } from 'src/infrastructure/repositories/bank-account.repository';

@Injectable()
export class BankingService {
  constructor(
    private readonly bankAccountLinkRepository: BankAccountLinkRepository,
    private readonly belvoRepository: BelvoService,
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}

  async getAllAccountsForCustomer(customerID: string) {
    return this.bankAccountRepository.getAllForCustomers([customerID]);
  }

  async createLink(customerID: string, linkDTO: LinkDTO) {
    const link = await this.bankAccountLinkRepository
      .getOne(linkDTO.linkID)
      .catch(() => null);

    if (link) return link;

    return this.bankAccountLinkRepository.createLink(customerID, linkDTO);
  }

  async handleLinkDataAvailable(linkID: string) {
    const link = await this.bankAccountLinkRepository.getOne(linkID);

    if (!link) {
      throw new Error('Cannot find bank link');
    }

    link.status = BankAccountLinkStatus.CONNECTED;

    await this.bankAccountLinkRepository.updateOne(link);

    const belvoAccounts = await this.belvoRepository.getAccounts(linkID);

    await this.bankAccountRepository.createMany(
      belvoAccounts.map((ba) => {
        return new BankAccount(
          link.customerID,
          link.id,
          ba.category,
          ba.name,
          ba.number,
          ba.institution.name,
          ba.balance.current,
        );
      }),
    );
  }
}
