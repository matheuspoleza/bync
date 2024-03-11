import { Injectable } from '@nestjs/common';

@Injectable()
export class YnabFacade {
  async connectWithBankAccount(ynabAccountID: string, bankAccountAdapter: B) {
    const ynabAccount = await this.ynabAccountRepository.getByID(ynabAccountID);

    if (!ynabAccount) {
      throw new Error('Ynab account not found');
    }

    ynabAccount.createConnectionWith(bankAccount);

    await this.ynabAccountRepository.update(ynabAccount);
  }
}
