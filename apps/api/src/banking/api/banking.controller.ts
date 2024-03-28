import { Controller, Get, Post, Body } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { CustomerID } from '../../common';
import { BankingService } from '../application/banking.service';

@Controller('banking')
export class BankingController {
  constructor(private readonly bankingService: BankingService) {}

  @OnEvent('ynab.account-linked')
  async linkBankAccount(payload: { bankAccountID: string }) {
    console.log('BANK ACCOUNT LINKED', payload.bankAccountID);
  }

  @Get('accounts')
  async getBankAccounts(@CustomerID() customerID: string) {
    return this.bankingService.getAccounts(customerID);
  }

  @Post('connection')
  async createConnection(
    @CustomerID() customerID: string,
    @Body() body: CreateConnectionDto,
  ) {
    return this.bankingService.createBankingConnection(
      customerID,
      body.linkID,
      body.institution,
    );
  }
}
