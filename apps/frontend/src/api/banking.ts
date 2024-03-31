import { BankingControllerCreateConnectionRequest } from './__generated__';
import { BaseApi } from './base';

export class BankingApi extends BaseApi {
  async createConnection(data: BankingControllerCreateConnectionRequest) {
    return this.banking.bankingControllerCreateConnection(data);
  }

  async getAccounts() {
    const response = await this.banking.bankingControllerGetBankAccounts();
    return response.data.bankAccounts;
  }
}
