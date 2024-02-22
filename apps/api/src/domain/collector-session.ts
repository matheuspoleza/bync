import { randomUUID } from 'crypto';
import { CollectorAccountData } from './collector-account';

export class CollectorSession<T> {
  public accountsData: CollectorAccountData<T>[] = [];
  public id: string = randomUUID();

  constructor(
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly bankAccountIDs?: string[],
  ) {}

  addData(data: CollectorAccountData<T>[]) {
    this.accountsData = [...this.accountsData, ...data];
  }
}
