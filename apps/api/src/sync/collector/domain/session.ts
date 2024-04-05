import { CollectorBankAccount } from './bank-account';
import { Transaction } from './transactions';

export interface SessionDto {
  id?: string;
  from: string;
  to: string;
  data?: SessionAccountData[];
}

export interface SessionAccountData {
  bankAccountId: string;
  customerId: string;
  transactions: any[];
}

export class Session {
  public id!: string;
  public from: string;
  public to: string;
  public customerIds!: string[];
  public bankAccountIds!: string[];
  public data: SessionAccountData[];
  public createdAt: Date = new Date();
  private bankAccounts: CollectorBankAccount[] = [];

  constructor(session: SessionDto) {
    this.from = session.from;
    this.to = session.to;
    this.data = session.data ?? [];

    if (session.id) {
      this.id = session.id;
    }
  }

  public addBankAccounts(bankAccounts: CollectorBankAccount[]) {
    this.bankAccounts = bankAccounts;
    this.bankAccountIds = bankAccounts.map((account) => account.id);
    this.customerIds = bankAccounts.map((account) => account.customerId);
  }

  public addTransactions(transactions: Transaction[]) {
    for (const transaction of transactions) {
      const accountData = this.data.find(
        (data) => data.bankAccountId === transaction.bankAccountId,
      );
      if (!accountData) {
        throw new Error(
          `Bank account with ID ${transaction.bankAccountId} not found in session`,
        );
      }
      accountData.transactions.push(transaction);
    }
  }

  get linkIds() {
    return new Set(this.bankAccounts.map((account) => account.linkId));
  }
}

export interface ISessionRepository {
  save(session: Session): Promise<void>;
  getOneById(sessionId: string): Promise<Session>;
}

export const ISessionRepository = Symbol('ISessionRepository');
