import { Body, Controller, Get, Post } from '@nestjs/common';

import { YNABRepository } from '../infrastructure/ynab/ynab.repository';
import { CustomerID } from './common';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly ynabRepository: YNABRepository) {}

  @Get('ynab/accounts')
  async getBudgetAccounts(@CustomerID() customerID: string) {
    return this.ynabRepository.getAllBudgetsAccounts(customerID);
  }

  @Post('ynab/auth')
  async authorizeYNAB(
    @CustomerID() customerID: string,
    @Body()
    { redirectURL, authCode }: { redirectURL: string; authCode: string },
  ) {
    const { data } = await this.ynabRepository.authorize({
      redirectURL,
      authCode,
    });

    if (!data) {
      throw new Error('Cannot store customer auth');
    }

    await this.ynabRepository.storeAuth(customerID, data);
  }
}
