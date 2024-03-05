export interface ICustomerRepository {
  getAll(): Promise<Customer[]>;
  getOne(customerID: string): Promise<Customer>;
}

export class CustomerDTO {
  constructor(public name: string) {}
}

export class Customer {
  constructor(public id: string, public name: string) {}
}
