import { Injectable } from '@nestjs/common';
import { BelvoGateway } from '../infrastructure/belvo.gateway';
import { BelvoAccountAdapter } from './adapter/belvo-account.adapter';
import { AccountsConnected } from '../../banking/domain/accounts-connected';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class BelvoService {
  constructor(
    private readonly belvoGateway: BelvoGateway,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async authenticate() {
    return await this.belvoGateway.createWidgetAccessToken();
  }

  public async handleNewAccountsAvailable(linkId: string) {
    const linkAccounts = await this.belvoGateway.getAccounts(linkId);

    const adapter = new BelvoAccountAdapter(linkId, linkAccounts);

    this.eventEmitter.emit(
      AccountsConnected.EventName,
      new AccountsConnected(linkId, adapter.accounts, adapter),
    );
  }

  public async getTransactionsBetween(
    linkId: string,
    from: string,
    to: string,
  ) {
    return await this.belvoGateway.getTransactionsBetween(linkId, from, to);
  }
}
