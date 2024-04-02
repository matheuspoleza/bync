import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import {
  CustomerId,
  ZodApiBody,
  ZodApiResponse,
  ZodValidationPipe,
} from '../../common';
import { YnabService } from '../application/ynab.service';
import {
  LinkYnabAccount,
  AuthorizeBudgetAccessRequest,
  GetYnabAccountsResponse,
} from './schema';
import { ApiTags } from '@nestjs/swagger';

@Controller('ynab')
@ApiTags('ynab')
export class YnabController {
  constructor(private readonly ynabService: YnabService) {}

  @Post('auth')
  @ZodApiBody({ schema: AuthorizeBudgetAccessRequest })
  @ZodApiResponse({ status: HttpStatus.OK })
  async authorize(
    @CustomerId() customerId: string,
    @Body(new ZodValidationPipe(AuthorizeBudgetAccessRequest))
    data: AuthorizeBudgetAccessRequest,
  ) {
    await this.ynabService.authorizeBudgetAccess(
      customerId,
      data.redirectURL,
      data.authCode,
    );
  }

  @Post('accounts/:accountId/link')
  @ZodApiBody({ schema: LinkYnabAccount })
  @ZodApiResponse({ status: HttpStatus.OK })
  async link(
    @Param('accountId') accountId: string,
    @Body(new ZodValidationPipe(LinkYnabAccount)) data: LinkYnabAccount,
  ) {
    await this.ynabService.createBankAccountLink(accountId, data.bankAccountID);
  }

  @Get('accounts')
  @ZodApiResponse({ status: HttpStatus.OK, schema: GetYnabAccountsResponse })
  async getAll(
    @CustomerId() customerId: string,
  ): Promise<GetYnabAccountsResponse> {
    const accounts = await this.ynabService.getAllForCustomer(customerId);

    return {
      accounts,
    };
  }
}
