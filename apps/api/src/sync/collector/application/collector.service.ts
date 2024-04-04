import { Inject, Injectable } from '@nestjs/common';
import { IBankingFacade } from '../domain/banking';

@Injectable()
export class CollectorService {
  constructor(@Inject(IBankingFacade) private bankingFacade: IBankingFacade) {}

  async collect({ from, to }: { from: Date, to: Date }) {
    const linkedBankAccounts = await this.bankingFacade.getAllLinkedAccounts();
    console.log({ from, to, linkedBankAccounts });

    // fetch transactions for each bank account


  }
}
