import { Injectable } from '@nestjs/common';
import { IYnabAccountRepository } from '../domain/ynab-account.repository';
import { YnabAccount } from '../domain/ynab-account';

@Injectable()
export class YnabAccountRepository implements IYnabAccountRepository {
  static YNAB_ACCOUNT_TABLE_NAME = 'ynab-accounts';

  constructor() {}

  async getByID(_: string) {
    return new YnabAccount({});
  }

  async update(_: YnabAccount) {}

  async create(_: YnabAccount) {
    return new YnabAccount({});
  }
}
