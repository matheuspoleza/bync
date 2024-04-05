import { BankAccountDto } from '../application/bank-account.dto';
import { BankAccountAdapter } from '../banking.facade';

export class AccountsConnected<T = unknown> {
  static EventName = 'banking.accounts.connected';

  public linkId: string;
  public accounts: BankAccountDto[];

  constructor(linkId: string, accounts: T[], adapter: BankAccountAdapter<T>) {
    this.linkId = linkId;
    this.accounts = adapter.toBanking(accounts);
  }
}
