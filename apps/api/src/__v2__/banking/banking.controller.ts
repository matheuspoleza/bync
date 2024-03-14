import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Controller('banking')
export class BankingController {
  @OnEvent('ynab.account-linked')
  async linkBankAccount(payload: { bankAccountID: string }) {
    console.log('BANK ACCOUNT LINKED', payload.bankAccountID);
  }
}
