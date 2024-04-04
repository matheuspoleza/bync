
export interface BankAccountDto {
  id: string;
  customerId: string;
  ynabAccountId: string;
  linkId: string;
}

export interface IBankingFacade {
  getAllLinkedAccounts(): Promise<BankAccountDto[]>;
}

export const IBankingFacade = Symbol('IBankingFacade');
