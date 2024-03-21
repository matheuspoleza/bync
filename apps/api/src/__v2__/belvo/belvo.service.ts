import { Injectable } from '@nestjs/common';
import { BelvoGateway } from './infrastructure/belvo.gateway';

@Injectable()
export class BelvoService {
  constructor(private readonly belvoGateway: BelvoGateway) {}

  public async authenticate() {
    return await this.belvoGateway.createWidgetAccessToken();
  }

  public async setupInstitutionAccounts() {
    const belvoAccounts = await this.belvoGateway.getAccounts(linkID);
    const bankAccountsAdapter = new BakingBelvoAdapter(belvoAccounts);

    await this.bankingService.setupAccounts(bankAccountsAdapter);
  }
}
