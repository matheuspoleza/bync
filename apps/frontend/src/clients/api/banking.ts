import { BankingControllerCreateConnectionRequest } from './__generated__';
import { BaseApi } from './base';

export class BankingApi extends BaseApi {
  async createConnection(data: BankingControllerCreateConnectionRequest) {
    return this.banking.bankingControllerCreateConnection(data);
  }

  async getAccounts() {
    return this.banking.bankingControllerGetBankAccounts();
  }
}
