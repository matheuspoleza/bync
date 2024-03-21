import { Body, Controller, Get, Post } from '@nestjs/common';
import { BelvoService } from '../../../infrastructure/belvo/belvo.service';
import { BankingService } from 'src/application/banking.service';
import { LinkDTO } from 'src/domain/bank-account-link';
import { CustomerID } from '../../../presentation/common';

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

  @Post('link')
  async createLink(@CustomerID() customerID: string, @Body() data: LinkDTO) {
    return this.bankingService.createLink(customerID, data);
  }
}
