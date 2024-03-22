import { Injectable } from '@nestjs/common';
import { BelvoGateway } from './infrastructure/belvo.gateway';
import { BankingFacade } from '../banking/facade/banking.facade';
import { BelvoAccountAdapter } from './adapter/belvo-account.adapter';

@Injectable()
export class BelvoService {
  constructor(
    private readonly belvoGateway: BelvoGateway,
    private readonly bankingFacade: BankingFacade,
  ) {}

  public async authenticate() {
    return await this.belvoGateway.createWidgetAccessToken();
  }

  public async setupAccounts(linkId: string) {
    const linkAccounts = await this.belvoGateway.getAccounts(linkId);
    const adapter = new BelvoAccountAdapter(linkAccounts);
    await this.bankingFacade.setupAccounts(adapter);
  }
}
