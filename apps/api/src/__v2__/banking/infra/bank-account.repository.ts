import { Injectable } from '@nestjs/common';
import { IBankAccountRepository, BankAccount } from '../domain/bank-account';

@Injectable()
export class BankAccountRepository implements IBankAccountRepository {
  async createMany(accounts: BankAccount[]): Promise<BankAccount[]> {
    return accounts;
  }
}
