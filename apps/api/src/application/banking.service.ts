import { Injectable } from '@nestjs/common';
import { LinkDTO } from 'src/domain/bank-account-link';
import { BankAccountLinkRepository } from 'src/infrastructure/repositories/bank-account-link.repository';

@Injectable()
export class BankingService {
  constructor(
    private readonly bankAccountLinkRepository: BankAccountLinkRepository,
  ) {}

  async getAllLinks(customerID: string) {
    const links = await this.bankAccountLinkRepository.getCustomerLinks(
      customerID,
    );

    console.log('LINKS', { links });

    return [];
  }

  async createLink(customerID: string, linkDTO: LinkDTO) {
    return this.bankAccountLinkRepository.createLink(customerID, linkDTO);
  }
}
