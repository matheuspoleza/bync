import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BelvoService } from '../infrastructure/belvo/belvo.service';
import { BankingService } from 'src/application/banking.service';
import { LinkDTO } from 'src/domain/bank-account-link';

@Controller('banking')
export class BankingController {
  constructor(
    private readonly belvoService: BelvoService,
    private readonly bankingService: BankingService,
  ) {}

  @Get(':customerID/accounts')
  async getAllBankAccounts(@Param('customerID') customerID: string) {
    return this.bankingService.getAllAccountsForCustomer(customerID);
  }

  @Post('belvo/session')
  async createSession() {
    return this.belvoService.createAccessToken();
  }

  @Post(':customerID/link')
  async createLink(
    @Param('customerID') customerID: string,
    @Body() data: LinkDTO,
  ) {
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
