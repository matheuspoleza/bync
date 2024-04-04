import { BankAccountAdapter } from '../../../banking/banking.facade';
import { BelvoAccountDto } from '../../api/dto/belvo-account.dto';
import {
  OFDABrazilAccount,
  BelvoAccountCategory,
} from '../../infrastructure/belvo.gateway';
import {
  BankAccountType,
  CreateBankAccountDto,
} from '../../../banking/application/bank-account.dto';

export class BelvoAccountAdapter implements BankAccountAdapter {
  private readonly linkId: string;
  private readonly accounts: BelvoAccountDto[];
  private readonly accountTypes = new Map([
    [BelvoAccountCategory.CheckingAccount, BankAccountType.CheckingAccount],
    [BelvoAccountCategory.CreditCard, BankAccountType.CreditCard],
    [BelvoAccountCategory.FinancingAccount, BankAccountType.FinancingAccount],
    [BelvoAccountCategory.InvestmentAccount, BankAccountType.InvestmentAccount],
    [BelvoAccountCategory.LoanAccount, BankAccountType.LoanAccount],
    [BelvoAccountCategory.SavingsAccount, BankAccountType.SavingsAccount],
  ]);

  constructor(linkId: string, accounts: OFDABrazilAccount[]) {
    this.linkId = linkId;
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

  getLinkId() {
    return this.linkId;
  }

  getAccounts() {
    return this.accounts
      .filter((account) => this.accountTypes.has(account.category))
      .map<CreateBankAccountDto>((account) => ({
        name: account.name,
        number: account.number,
        type: this.accountTypes.get(account.category) as BankAccountType,
        link: account.link,
        institution: account.institutionName,
        balance: account.currentBalance,
      }));
  }
}
