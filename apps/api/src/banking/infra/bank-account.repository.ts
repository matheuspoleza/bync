import { Injectable } from '@nestjs/common';
import {
  IBankAccountRepository,
  BankAccount,
  BankAccountType,
} from '../domain/bank-account';
import { DatabaseService, Tables } from '../../common';
import {
  ConnectionLink,
  ConnectionLinkStatus,
} from '../domain/connection-link';

@Injectable()
export class BankAccountRepository implements IBankAccountRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  private fromDB(
    dbResult: Tables<'banking_bank_accounts'>,
    connectionLink: Tables<'banking_connection_link'>,
  ): BankAccount {
    return new BankAccount({
      id: dbResult.id,
      accountName: dbResult.account_name,
      balance: dbResult.balance,
      connectionLink: new ConnectionLink({
        id: connectionLink.id,
        customerId: connectionLink.customer_id,
        institution: connectionLink.institution,
        linkId: connectionLink.link_id,
        status: connectionLink.status as ConnectionLinkStatus,
      }),
      customerId: dbResult.customer_id,
      institution: dbResult.institution,
      number: dbResult.number,
      type: dbResult.type as BankAccountType,
      lastSyncedAt: dbResult.last_synced_at?.toString(),
      ynabAccountId: dbResult.ynab_account_id ?? undefined,
    });
  }

  private toDB(bankAccount: BankAccount) {
    return {
      account_name: bankAccount.name,
      balance: bankAccount.balance,
      connection_link_id: bankAccount.connectionId,
      customer_id: bankAccount.customerId,
      institution: bankAccount.institution,
      number: bankAccount.number,
      type: bankAccount.type,
    };
  }

  public async getAllForCustomer(customerId: string): Promise<BankAccount[]> {
    const result = await this.databaseService.schema
      .from('banking_bank_accounts')
      .select(
        `
        *,
        banking_connection_link ( * )
      `,
      )
      .eq('customer_id', customerId);

    if (!result.data) return [];

    return result.data.reduce<BankAccount[]>((acc, dbResult) => {
      if (!dbResult.banking_connection_link) return acc;

      return [...acc, this.fromDB(dbResult, dbResult.banking_connection_link)];
    }, []);
  }

  public async getOneById(id: string): Promise<BankAccount | null> {
    const result = await this.databaseService.schema
      .from('banking_bank_accounts')
      .select(
        `
        *,
        banking_connection_link ( * )
      `,
      )
      .eq('id', id)
      .single();

    if (!result.data || !result.data.banking_connection_link) return null;

    return this.fromDB(result.data, result.data.banking_connection_link);
  }

  public async updateBankAccountLink(bankAccount: BankAccount): Promise<void> {
    if (!bankAccount.linkedAccountId) return;

    const result = await this.databaseService.schema
      .from('bank_accounts')
      .update({ ynab_account_id: bankAccount.linkedAccountId })
      .eq('id', bankAccount.id)
      .select('*')
      .single();

    if (result.error || !result.data) {
      throw new Error(
        `Failed to update bank account link: ${result.error?.message}`,
      );
    }
  }

  public async createMany(accounts: BankAccount[]): Promise<BankAccount[]> {
    const creationResult = await this.databaseService.schema
      .from('bank_accounts')
      .insert(accounts.map(this.toDB))
      .select(
        `
          *,
          banking_connection_link ( * )
        `,
      );

    if (!creationResult.data || creationResult.error) {
      throw new Error(`Failed to create accounts: ${creationResult.error}`);
    }

    return creationResult.data.reduce<BankAccount[]>((acc, account) => {
      if (!account.connection_link) return acc;
      return [...acc, this.fromDB(account, account.connection_link)];
    }, []);
  }

  public async getAllLinkedAccountsForCustomer(
    customerId: string,
  ): Promise<BankAccount[]> {
    const result = await this.databaseService.schema
      .from('bank_accounts')
      .select(
        `
        *,
        banking_connection_link ( * )
      `,
      )
      .not('connection_link_id', 'is', null)
      .not('ynab_account_id', 'is', null)
      .eq('customer_id', customerId);

    if (!result.data) return [];

    return result.data.reduce<BankAccount[]>((acc, dbResult) => {
      if (!dbResult.connection_link) return acc;

      return [...acc, this.fromDB(dbResult, dbResult.connection_link)];
    }, []);
  }

  public async getAllByIds(ids: string[]): Promise<BankAccount[]> {
    const result = await this.databaseService.schema
      .from('banking_bank_accounts')
      .select(
        `
        *,
        banking_connection_link ( * )
      `,
      )
      .in('id', ids);

    if (!result.data) return [];

    return result.data.reduce<BankAccount[]>((acc, dbResult) => {
      if (!dbResult.banking_connection_link) return acc;

      return [...acc, this.fromDB(dbResult, dbResult.banking_connection_link)];
    }, []);
  }
}
