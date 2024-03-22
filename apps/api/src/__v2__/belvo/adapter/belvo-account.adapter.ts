import { AccountsReturn } from 'belvo';

import { BankingAccountAdapter } from '../../banking/adapters/banking-account.adapter';
import {
  BelvoAccountDto,
  BelvoAccountBalanceType,
  BelvoAccountCategory,
  BelvoAccountInstutionType,
} from '../dto/belvo-account.dto';

type OFDABrazilAccount = AccountsReturn & {
  subtype: string;
  balance_type: BelvoAccountBalanceType;
};

export class BelvoAccountAdapter implements BankingAccountAdapter {
  private readonly accounts: BelvoAccountDto[];

  constructor(accounts: OFDABrazilAccount[]) {
    this.accounts = accounts.map<BelvoAccountDto>((account) => ({
      id: account.id as string,
      link: account.link,
      name: account.name,
      number: account.number,
      institutionName: account.institution.name,
      instutionType: account.institution.type as BelvoAccountInstutionType,
      category: account.category as BelvoAccountCategory,
      type: account.type,
      subtype: account.subtype,
      currentBalance: account.balance.current,
      balanceType: account.balance_type,
    }));
  }

  getAccounts() {
    return this.accounts;
  }
}
