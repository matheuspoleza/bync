export enum BankAccountType {
  CheckingAccount = 'Checking Account',
  CreditCard = 'Credit Card',
  FinancingAccount = 'Financing Account',
  InvestmentAccount = 'Investment Account',
  LoanAccount = 'Loan Account',
  SavingsAccount = 'Savings Account',
}

export interface BankAccountDto {
  id: string;
  customerId: string;
  linkedAccountId?: string;
  link: string;
  name: string;
  number: string;
  institution: string;
  type: BankAccountType;
  balance: number;
}

export type CreateBankAccountDto = Omit<BankAccountDto, 'id' | 'customerId'>;
