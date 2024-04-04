import { Session } from './session';

export interface NewTransactionsCollectedEventDto {
  sessionId: string;
  customerId: string;
  bankAccountIds: string;
  totalTransactions: number;
  from: Date;
  to: Date;
}

export class NewTransactionsCollectedEvent {
  static readonly EVENT_NAME = 'sync.collector.new-transactions-collected';

  public sessionId: string;
  public customerId: string;
  public bankAccountIds: string;
  public totalTransactions: number;
  public from: Date;
  public to: Date;
  public createdAt: Date = new Date();

  constructor(eventDto: NewTransactionsCollectedEventDto) {
    this.sessionId = eventDto.sessionId;
    this.customerId = eventDto.customerId;
    this.bankAccountIds = eventDto.bankAccountIds;
    this.totalTransactions = eventDto.totalTransactions;
    this.from = eventDto.from;
    this.to = eventDto.to;
  }
}
