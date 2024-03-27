import { Controller, Get, Post, Body } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CustomerID } from '../../presentation/common';
import { LinkDTO } from '../../domain/bank-account-link';
import { BelvoService } from '../../infrastructure/belvo/belvo.service';
import { BankingService } from '../../application/banking.service';

@Controller('banking')
export class BankingController {
  constructor(
    private readonly belvoService: BelvoService,
    private readonly bankingService: BankingService,
  ) {
  }
}
  @OnEvent('ynab.account-linked')
  async linkBankAccount(payload: { bankAccountID: string }) {
    console.log('BANK ACCOUNT LINKED', payload.bankAccountID);
  }

  @Get('accounts')
  async getAllBankAccounts(@CustomerID() customerID: string) {
    return this.bankingService.getAllAccountsForCustomer(customerID);
  }

  @Post('link')
  async createLink(@CustomerID() customerID: string, @Body() data: LinkDTO) {
    return this.bankingService.createLink(customerID, data);
  }
}
