export class CollectorAccountData<T> {
  constructor(
    public readonly bankAccountID: string,
    public readonly customerID: string,
    public readonly transactions: T[],
  ) {}
}
