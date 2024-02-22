import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { RedisService } from '../infrastructure/database';
import { YNABRepository } from '../infrastructure/ynab/ynab.repository';

@Controller('budgets')
export class BudgetsController {
  constructor(
    private readonly redisService: RedisService,
    private readonly ynabRepository: YNABRepository,
  ) {}

  @Get('/ynab/:customerID/accounts')
  async getBudgetAccounts(@Param('customerID') customerID: string) {
    return this.ynabRepository.getAllBudgetsAccounts(customerID);
  }

  @Post('/ynab/:customerID/auth')
  async authorizeYNAB(
    @Param('customerID') customerID: string,
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
