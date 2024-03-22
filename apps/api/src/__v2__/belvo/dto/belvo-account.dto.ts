export enum BelvoAccountCategory {
  AdvanceDepositAccount = 'ADVANCE_DEPOSIT_ACCOUNT',
  CheckingAccount = 'CHECKING_ACCOUNT',
  CreditCard = 'CREDIT_CARD',
  FinancingAccount = 'FINANCING_ACCOUNT',
  InvestmentAccount = 'INVESTMENT_ACCOUNT',
  InvoiceFinancingAccount = 'INVOICE_FINANCING_ACCOUNT',
  LoanAccount = 'LOAN_ACCOUNT',
  PensionFundAccount = 'PENSION_FUND_ACCOUNT',
  SavingsAccount = 'SAVINGS_ACCOUNT',
  Uncategorized = 'UNCATEGORIZED',
}

export enum BelvoAccountInstutionType {
  Bank = 'bank',
  Fiscal = 'fiscal',
  Employment = 'employment',
}

/*
Indicates whether this account is either an ASSET or a LIABILITY.
You can consider the balance of an ASSET as being positive, while the balance of a LIABILITY as negative.
 */
export enum BelvoAccountBalanceType {
  Asset = 'ASSET',
  Liability = 'LIABILITY',
}

export interface BelvoAccountDto {
  id: string;
  link: string;
  name: string;
  number: string;
  institutionName: string;
  instutionType: BelvoAccountInstutionType;
  category: BelvoAccountCategory;
  type: string;
  subtype: string;
  currentBalance: number;
  balanceType: BelvoAccountBalanceType;
}
