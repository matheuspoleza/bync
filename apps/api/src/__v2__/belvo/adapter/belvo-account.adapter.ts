import { BankingAccountAdapter } from '../../banking/adapters/banking-account.adapter';
import { BelvoAccountDto } from '../dto/belvo-account.dto';
import {
  OFDABrazilAccount,
  BelvoAccountCategory,
} from '../infrastructure/belvo.gateway';
import {
  BankingAccountDto,
  BankingAccountType,
} from '../../banking/dto/banking-account.dto';

export class BelvoAccountAdapter implements BankingAccountAdapter {
  private readonly accounts: BelvoAccountDto[];
  private readonly accountTypes = new Map([
    [BelvoAccountCategory.CheckingAccount, BankingAccountType.CheckingAccount],
    [BelvoAccountCategory.CreditCard, BankingAccountType.CreditCard],
    [
      BelvoAccountCategory.FinancingAccount,
      BankingAccountType.FinancingAccount,
    ],
    [
      BelvoAccountCategory.InvestmentAccount,
      BankingAccountType.InvestmentAccount,
    ],
    [BelvoAccountCategory.LoanAccount, BankingAccountType.LoanAccount],
    [BelvoAccountCategory.SavingsAccount, BankingAccountType.SavingsAccount],
  ]);

  constructor(accounts: OFDABrazilAccount[]) {
    this.accounts = accounts.map<BelvoAccountDto>((account) => ({
      id: account.id as string,
      link: account.link,
      name: account.name,
      number: account.number,
      institutionName: account.institution.name,
      instutionType: account.institution.type,
      category: account.category,
      type: account.type,
      subtype: account.subtype,
      currentBalance: account.balance.current,
      balanceType: account.balance_type,
    }));
  }

  getAccounts() {
    return this.accounts
      .filter((account) => this.accountTypes.has(account.category))
      .map<BankingAccountDto>((account) => ({
        name: account.name,
        number: account.number,
        type: this.accountTypes.get(account.category) as BankingAccountType,
        link: account.link,
        institution: account.institutionName,
        balance: account.currentBalance,
      }));
  }
}
