type Interests = {};

export interface BudgetAccountResponse {
  balance: number;
  cleared_balance: number;
  closed: boolean;
  debt_escrow_amounts: Interests;
  debt_interest_rates: Interests;
  debt_minimum_payments: Interests;
  deleted: boolean;
  direct_import_in_error: boolean;
  direct_import_linked: boolean;
  id: string;
  last_reconciled_at: string;
  name: string;
  on_budget: boolean;
  transfer_payee_id: string;
  type: string;
  uncleared_balance: number;
}

export enum BudgetAccountType {
  CHECKING = 'checking',
  CREDIT = 'creditCard',
  AUTO_LOAN = 'autoLoan',
  MORTGAGE = 'mortgage',
  DEBT = 'otherDebt',
  INVESTMENT = 'otherAsset',
}

export interface BudgetAccount {
  id: string;
  balance: number;
  unclearedBalance: number;
  type: BudgetAccountType;
  name: string;
  updatedAt: Date;
}

export const budgetAccountAdapter = {
  fromResponse: ({
    id,
    balance,
    type,
    name,
    last_reconciled_at,
    uncleared_balance,
  }: BudgetAccountResponse): BudgetAccount => {
    return {
      id,
      balance,
      type: type as BudgetAccountType,
      name,
      unclearedBalance: uncleared_balance,
      updatedAt: new Date(last_reconciled_at),
    };
  },
};
