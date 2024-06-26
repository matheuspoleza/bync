import { Injectable } from '@nestjs/common';
import { YnabAccount } from '../domain/ynab-account';
import { DatabaseService, Tables } from '../../common';

@Injectable()
export class YnabAccountRepository {
  constructor(private databaseService: DatabaseService) {}

  private fromDB(data: Tables<'ynab_accounts'>) {
    return new YnabAccount({
      id: data.id,
      balance: data.balance,
      name: data.name,
      type: data.type,
      linkedBankAccountId: data?.bank_account_id ?? undefined,
      lastSyncedAt: data.last_synced_at
        ? new Date(data.last_synced_at)
        : undefined,
      ynabAccountId: data.ynab_account_id,
      budgetId: data.budget_id,
      customerId: data.customer_id,
    });
  }

  async getAllForCustomer(customerId: string) {
    const { data } = await this.databaseService.schema
      .from('ynab_accounts')
      .select('*')
      .eq('customer_id', customerId);

    if (!data) return [] as YnabAccount[];

    return data.map((dbAccount) => this.fromDB(dbAccount));
  }

  async getOneById(accountId: string) {
    const { data } = await this.databaseService.schema
      .from('ynab_accounts')
      .select('*')
      .eq('id', accountId)
      .single();

    if (!data) return null;

    return this.fromDB(data);
  }

  async updateLink(ynabAccount: YnabAccount): Promise<void> {
    const result = await this.databaseService.schema
      .from('ynab_accounts')
      .update({
        bank_account_id: ynabAccount.linkedBankAccountId,
      })
      .eq('id', ynabAccount.id);

    if (result.error) {
      throw new Error(`Failed to update ynab account: ${result.error.message}`);
    }
  }

  async create(ynabAccount: YnabAccount): Promise<YnabAccount> {
    const result = await this.databaseService.schema
      .from('ynab_accounts')
      .insert({
        name: ynabAccount.name,
        customer_id: ynabAccount.customerId,
        budget_id: ynabAccount.budgetId,
        type: ynabAccount.type,
        ynab_account_id: ynabAccount.ynabAccountId,
        balance: ynabAccount.balance,
        bank_account_id: ynabAccount.linkedBankAccountId,
      })
      .select('*')
      .single();

    if (!result.data || result.error) {
      throw new Error(`Failed to create ynab account: ${result.error.message}`);
    }

    return this.fromDB(result.data);
  }
}
