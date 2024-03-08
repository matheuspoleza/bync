import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../__v2__/database/database.service';
import { BankAccount, IBankAccountRepository } from 'src/domain/bank-account';
import { Tables } from '../../__v2__/database/database.types';

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
          bankAccount.customer_id,
          bankAccount.link_id,
          bankAccount.type,
          bankAccount.name,
          bankAccount.number,
          bankAccount.institution,
          bankAccount.balance,
          bankAccount.id,
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
          bankAccount.customer_id,
          bankAccount.link_id,
          bankAccount.type,
          bankAccount.name,
          bankAccount.number,
          bankAccount.institution,
          bankAccount.balance,
          bankAccount.id,
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
          bankAccount.customer_id,
          bankAccount.link_id,
          bankAccount.type,
          bankAccount.name,
          bankAccount.number,
          bankAccount.institution,
          bankAccount.balance,
          bankAccount.id,
        ),
    );
  }

  async createMany(bankAccounts: BankAccount[]): Promise<void> {
    const client = this.databaseService.getClient();

    const data = bankAccounts.map<
      Omit<Tables<'bank_accounts'>, 'id' | 'created_at'>
    >((b) => ({
      type: b.type,
      balance: b.balance,
      customer_id: b.customerID,
      institution: b.institution,
      link_id: b.linkID,
      name: b.name,
      number: b.number,
    }));

    await client
      .from(BankAccountRepository.TABLE_NAME)
      .insert(data)
      .throwOnError();
  }
}
