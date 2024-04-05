import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import {
  CustomerId,
  ZodApiBody,
  ZodApiResponse,
  ZodValidationPipe,
} from '../../common';
import { BankingService } from '../application/banking.service';
import {
  CreateConnectionRequest,
  CreateConnectionResponse,
  GetAccountsResponse,
} from './schema';
import { BankAccountDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { CreateSessionResponse } from './schema/create-session.request';
import { BelvoFacade } from 'src/belvo/belvo.facade';

@Controller('banking')
@ApiTags('banking')
export class BankingController {
  constructor(
    private readonly bankingService: BankingService,
    private readonly belvoFacade: BelvoFacade,
  ) {}

  @OnEvent('ynab.account.linked')
  async linkBankAccount(payload: {
    bankAccountID: string;
    ynabAccountId: string;
  }) {
    await this.bankingService.linkBankAccount(
      payload.bankAccountID,
      payload.ynabAccountId,
    );
  }

  @Get('accounts')
  @ZodApiResponse({ status: HttpStatus.OK, schema: GetAccountsResponse })
  async getBankAccounts(
    @CustomerId() customerId: string,
  ): Promise<GetAccountsResponse> {
    const bankAccounts = await this.bankingService.getAccounts(customerId);

    return {
      bankAccounts: bankAccounts.map<BankAccountDto>((account) => ({
        id: account.id,
        balance: account.balance,
        institution: account.institution,
        name: account.name,
        number: account.number,
        type: account.type,
      })),
    };
  }

  @Post('connection')
  @ZodApiBody({ schema: CreateConnectionRequest })
  @ZodApiResponse({ status: HttpStatus.OK, schema: CreateConnectionResponse })
  async createConnection(
    @CustomerId() customerId: string,
    @Body(new ZodValidationPipe(CreateConnectionRequest))
    data: CreateConnectionRequest,
  ): Promise<CreateConnectionResponse> {
    return this.bankingService.createBankingConnection(
      customerId,
      data.linkId,
      data.institution,
    );
  }

  @Post('session')
  @ZodApiResponse({ status: HttpStatus.OK, schema: CreateSessionResponse })
  async createSession(): Promise<CreateSessionResponse> {
    return this.belvoFacade.authenticate();
  }
}
