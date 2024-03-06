import { Body, Controller, Get, Post } from '@nestjs/common';
import { BelvoService } from '../infrastructure/belvo/belvo.service';
import { BankingService } from 'src/application/banking.service';
import { LinkDTO } from 'src/domain/bank-account-link';
import { CustomerID } from './common';

@Controller('banking')
export class BankingController {
  constructor(
    private readonly belvoService: BelvoService,
    private readonly bankingService: BankingService,
  ) {}

  @Get('accounts')
  async getAllBankAccounts(@CustomerID() customerID: string) {
    return this.bankingService.getAllAccountsForCustomer(customerID);
  }

  @Post('belvo/session')
  async createSession() {
    return this.belvoService.createAccessToken();
  }

  @Post('link')
  async createLink(@CustomerID() customerID: string, @Body() data: LinkDTO) {
    return this.bankingService.createLink(customerID, data);
  }

  @Post('belvo/webhook')
  async receiveBelvoWebhook(@Body() data: any) {
    if (
      data.webhook_type === 'ACCOUNTS' &&
      data.webhook_code === 'historical_update'
    ) {
      const linkID = data.link_id;

      if (!linkID) return;

      this.bankingService.handleLinkDataAvailable(linkID);
    }
  }
}
