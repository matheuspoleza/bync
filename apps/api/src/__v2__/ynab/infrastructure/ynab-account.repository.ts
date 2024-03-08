import { Injectable } from '@nestjs/common';
import { IYnabAccountRepository } from '../domain/ynab-account.repository';
import { YnabAccount } from '../domain/ynab-account';

@Injectable()
export class YnabAccountRepository implements IYnabAccountRepository {
  constructor() {}

  async getByID(_: string) {
    return new YnabAccount();
  }

  async update(_: YnabAccount) {}
}
