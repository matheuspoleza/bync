import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../__v2__/database/database.service';
import { Tables } from '../../__v2__/database';
import { IYNABAccountRepository, YNABAccount } from 'src/domain/ynab-account';

@Injectable()
export class YNABAccountRepository implements IYNABAccountRepository {
  static TABLE_NAME = 'ynab_account';

  constructor(private databaseService: DatabaseService) {}

  async create(customerID: string, account: YNABAccount) {
    const client = this.databaseService.getClient();

    const { data, error } = await client
      .schema('public')
      .from(YNABAccountRepository.TABLE_NAME)
      .insert({
        name: account.name,
        balance: account.balance,
        budget_id: account.budgetID,
        ynab_account_id: account.ynabAccountID,
        customer_id: customerID,
      })
      .select();

    if (!data || error) {
      console.error(error);
      throw new Error(`aFailed to create ynab account: ${error.message}`);
    }

    const created = data[0] as Tables<'ynab_account'>;

    return new YNABAccount(
      created.name,
      created.balance,
      created.budget_id,
      created.ynab_account_id,
      created.id,
    );
  }
}
