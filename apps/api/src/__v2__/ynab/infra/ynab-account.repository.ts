import { Injectable } from '@nestjs/common';
import { YnabAccount } from '../domain/ynab-account';
import { DatabaseService } from 'src/__v2__/common';

@Injectable()
export class YnabAccountRepository {
  static TABLE_NAME = 'ynab_accounts';

  constructor(private databaseService: DatabaseService) {}

  async getAllForCustomer(customerID: string) {
    const { data } = await this.databaseService.client
      .schema('public')
      .from(YnabAccountRepository.TABLE_NAME)
      .select(
        `
        id,
        balance,
        name,
        ynab_account_id,
        customer_id,
        bank_account_id
      `,
      )
      .eq('customer_id', customerID)
      .single();

    if (!data) return [];

    return new YnabAccount({
      id: data.id,
      balance: data.balance,
      name: data.name,
      type: '',
      linkedBankAccountID: data?.bank_account_id,
      lastSyncedAt: new Date(),
      ynabAccountID: data.ynab_account_id,
    });
  }

  async getByID(accountID: string) {
    const { data } = await this.databaseService.client
      .schema('public')
      .from(YnabAccountRepository.TABLE_NAME)
      .select(
        `
        id,
        balance,
        name,
        ynab_account_id,
        customer_id,
        bank_account_id
      `,
      )
      .eq('id', accountID)
      .single();

    if (!data) return null;

    return new YnabAccount({
      id: data.id,
      balance: data.balance,
      name: data.name,
      type: '',
      linkedBankAccountID: data?.bank_account_id,
      lastSyncedAt: new Date(),
      ynabAccountID: data.ynab_account_id,
    });
  }

  async update(_: YnabAccount) {}

  async create(_: YnabAccount) {
    // return new YnabAccount({});
  }
}
