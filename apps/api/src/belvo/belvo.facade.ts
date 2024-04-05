import { Injectable } from '@nestjs/common';
import { BelvoGateway } from './infrastructure/belvo.gateway';

@Injectable()
export class BelvoFacade {
  constructor(private readonly belvoGateway: BelvoGateway) {}

  public async authenticate() {
    return await this.belvoGateway.createWidgetAccessToken();
  }

  public async getTransactionsBetween(linkId: string, from: Date, to: Date) {
    return await this.belvoGateway.getTransactionsBetween(linkId, from, to);
  }
}
