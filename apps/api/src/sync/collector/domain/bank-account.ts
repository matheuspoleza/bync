import { BankAccountDto } from '../../../banking/application/bank-account.dto';
import { BankAccountAdapter } from '../../../banking/banking.facade';

export interface CollectorBankAccount {
  id: string;
  customerId: string;
  ynabAccountId: string;
  linkId: string;
}

export class CollectorBankAccountAdapter
  implements BankAccountAdapter<CollectorBankAccount>
{
  public accounts: CollectorBankAccount[] = [];

  fromBanking(bankAccounts: BankAccountDto[]): CollectorBankAccount[] {
    return bankAccounts.map<CollectorBankAccount>((bankAccount) => ({
      id: bankAccount.id!,
      customerId: bankAccount.customerId!,
      linkId: bankAccount.link,
      ynabAccountId: bankAccount.linkedAccountId!,
    }));
  }

  toBanking(): BankAccountDto[] {
    return [] as BankAccountDto[];
  }
}
