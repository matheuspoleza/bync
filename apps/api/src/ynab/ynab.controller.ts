import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { CustomerID, ZodValidationPipe } from '../common';
import { YnabService } from './ynab.service';
import { AuthorizeBudgetAccessRequest } from './dtos/authorize-budget-access-request.dto';
import { LinkYnabAccount } from './dtos/link-ynab-account.dto';

@Controller('ynab')
export class YnabController {
  constructor(private readonly ynabService: YnabService) {}

  @Post('auth')
  @UsePipes(new ZodValidationPipe(AuthorizeBudgetAccessRequest))
  async authorize(
    @CustomerID() customerID: string,
    @Body() body: AuthorizeBudgetAccessRequest,
  ) {
    await this.ynabService.authorizeBudgetAccess(
      customerID,
      body.redirectURL,
      body.authCode,
    );
  }

  @Post('accounts/:accountID/link')
  @UsePipes(new ZodValidationPipe(LinkYnabAccount))
  async link(
    @Param('accountID') accountID: string,
    @Body() body: LinkYnabAccount,
  ) {
    await this.ynabService.createBankAccountLink(accountID, body.bankAccountID);
  }

  @Get('accounts')
  async getAll(@CustomerID() customerID: string) {
    return this.ynabService.getAllForCustomer(customerID);
  }
}
