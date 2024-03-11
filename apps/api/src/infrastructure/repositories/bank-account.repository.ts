import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../__v2__/common/database/database.service';
import { BankAccount, IBankAccountRepository } from 'src/domain/bank-account';
import { Tables } from '../../__v2__/common/database/database.types';

@Injectable()
export class BankAccountRepository implements IBankAccountRepository {
  constructor(private databaseService: DatabaseService) {}

  async getAll(): Promise<BankAccount[]> {
    const { data } = await this.databaseService.client
      .schema('public')
      .from('bank_accounts')
      .select('*');

    const bankAccountsData = data;

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
    const { data, error } = await this.databaseService.client
      .from('bank_accounts')
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
    const { data, error } = await this.databaseService.client
      .from('bank_accounts')
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
    const data = bankAccounts.map((b) => ({
      type: b.type,
      balance: b.balance,
      customer_id: b.customerID,
      institution: b.institution,
      link_id: b.linkID,
      name: b.name,
      number: b.number,
    }));

    await this.databaseService.client
      .from('bank_accounts')
      .insert(data)
      .throwOnError();
  }
}
