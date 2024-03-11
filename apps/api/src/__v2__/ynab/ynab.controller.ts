import { Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerID } from 'src/presentation/common';

@Controller('ynab')
export class YnabController {
  @Post('auth')
  async authorize(@CustomerID() customerID: string) {}

  @Post('accounts/:accountID/link')
  async link(@Param('accountID') accountID: string) {}

  @Get('accounts')
  async getAll(@CustomerID() customerID: string) {}
}
