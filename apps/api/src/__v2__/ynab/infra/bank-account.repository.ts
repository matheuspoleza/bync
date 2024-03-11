import { Injectable } from '@nestjs/common';
import { BankAccount } from '../domain/bank-account';
import { IBankAccountRepository } from '../domain/bank-account';
import { DatabaseService } from 'src/__v2__/common';

@Injectable()
export class BankAccountRepository implements IBankAccountRepository {
  constructor(private readonly database: DatabaseService);

  async getByID(_: string): Promise<BankAccount> {
    return new BankAccount();
  }
}
