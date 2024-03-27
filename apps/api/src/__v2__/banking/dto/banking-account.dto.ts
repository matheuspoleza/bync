export enum BankingAccountType {
  CheckingAccount = 'Checking Account',
  CreditCard = 'Credit Card',
  FinancingAccount = 'Financing Account',
  InvestmentAccount = 'Investment Account',
  LoanAccount = 'Loan Account',
  SavingsAccount = 'Savings Account',
}

export interface BankingAccountDto {
  link: string;
  name: string;
  number: string;
  institution: string;
  type: BankingAccountType;
  balance: number;
}
