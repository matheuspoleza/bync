import { Injectable } from '@nestjs/common';
import { BankAccount } from '../domain/bank-account';
import { IBankAccountRepository } from '../domain/bank-account.repository';

@Injectable()
export class BankAccountRepository implements IBankAccountRepository {
  async getByID(_: string): Promise<BankAccount> {
    return new BankAccount();
  }
}
