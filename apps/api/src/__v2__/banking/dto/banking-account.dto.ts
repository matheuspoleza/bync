export enum BankingAccountType {
  CheckingAccount = 'CHECKING_ACCOUNT',
  CreditCard = 'CREDIT_CARD',
  FinancingAccount = 'FINANCING_ACCOUNT',
  InvestmentAccount = 'INVESTMENT_ACCOUNT',
  LoanAccount = 'LOAN_ACCOUNT',
  SavingsAccount = 'SAVINGS_ACCOUNT',
}

export interface BankingAccountDto {
  link: string;
  name: string;
  number: string;
  institution: string;
  type: BankingAccountType;
  balance: number;
}
