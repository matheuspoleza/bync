export interface ICustomerRepository {
  getAll(): Promise<Customer[]>;
}

export class Customer {
  constructor(
    public id: string,
    public name: string,
  ) {}
}
