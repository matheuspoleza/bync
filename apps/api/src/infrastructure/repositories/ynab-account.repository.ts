import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../__v2__/common/database/database.service';
import { IYNABAccountRepository, YNABAccount } from 'src/domain/ynab-account';

@Injectable()
export class YNABAccountRepository implements IYNABAccountRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(_: string, account: YNABAccount) {
    const { data, error } = await this.databaseService.client
      .schema('public')
      .from('ynab_account')
      .insert({
        id: account.id,
        name: account.name,
        budget_id: account.budgetID,
        ynab_account_id: account.ynabAccountID,
        balance: account.balance,
      })
      .select()
      .single();

    if (!data || error) {
      console.error(error);
      throw new Error(`aFailed to create ynab account: ${error.message}`);
    }

    return new YNABAccount(
      data.name,
      data.balance,
      data.budget_id,
      data.ynab_account_id,
      data.id,
    );
  }
}
