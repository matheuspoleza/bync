import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  BankAccount,
  BankAccountType,
  IBankAccountRepository,
} from 'src/domain/bank-account';
import { Tables } from '../database/database.types';

@Injectable()
export class BankAccountRepository implements IBankAccountRepository {
  static TABLE_NAME = 'bank_accounts';

  constructor(private databaseService: DatabaseService) {}

  async getAll(): Promise<BankAccount[]> {
    const client = this.databaseService.getClient();

    const { data } = await client
      .schema('public')
      .from(BankAccountRepository.TABLE_NAME)
      .select('*');

    const bankAccountsData = data as Tables<'bank_accounts'>[];

    return bankAccountsData.map(
      (bankAccount) =>
        new BankAccount(
          bankAccount.id,
          bankAccount.ynab_account_name,
          bankAccount.ynab_account_id,
          bankAccount.mobilis_account_name,
          bankAccount.mobilis_account_id,
          bankAccount.type as BankAccountType,
          bankAccount.customer_id,
        ),
    );
  }

  async getAllForCustomers(customerIDs: string[]): Promise<BankAccount[]> {
    const client = this.databaseService.getClient();

    const { data, error } = await client
      .from(BankAccountRepository.TABLE_NAME)
      .select('*')
      .in('customer_id', customerIDs);

    if (error) {
      throw new Error(`Failed to retrieve bank accounts: ${error.message}`);
    }

    const bankAccountsData = data as Tables<'bank_accounts'>[];

    return bankAccountsData.map(
      (bankAccount) =>
        new BankAccount(
          bankAccount.id,
          bankAccount.ynab_account_name,
          bankAccount.ynab_account_id,
          bankAccount.mobilis_account_name,
          bankAccount.mobilis_account_id,
          bankAccount.type as BankAccountType,
          bankAccount.customer_id,
        ),
    );
  }

  async getAllByIDs(ids: string[]): Promise<BankAccount[]> {
    const client = this.databaseService.getClient();

    const { data, error } = await client
      .from(BankAccountRepository.TABLE_NAME)
      .select('*')
      .in('id', ids);

    if (error) {
      throw new Error(`Failed to retrieve bank accounts: ${error.message}`);
    }

    const bankAccountsData = data as Tables<'bank_accounts'>[];

    return bankAccountsData.map(
      (bankAccount) =>
        new BankAccount(
          bankAccount.id,
          bankAccount.ynab_account_name,
          bankAccount.ynab_account_id,
          bankAccount.mobilis_account_name,
          bankAccount.mobilis_account_id,
          bankAccount.type as BankAccountType,
          bankAccount.customer_id,
        ),
    );
  }
}
