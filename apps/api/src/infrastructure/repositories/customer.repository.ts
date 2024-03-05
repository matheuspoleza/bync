import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ICustomerRepository, Customer } from 'src/domain/customer';
import { Tables } from '../database/database.types';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  static TABLE_NAME = 'customers';

  constructor(private databaseService: DatabaseService) {}

  async getAll(): Promise<Customer[]> {
    const client = this.databaseService.getClient();

    const { data } = await client
      .schema('public')
      .from(CustomerRepository.TABLE_NAME)
      .select('*');

    const customersData = data as Tables<'customers'>[];

    return customersData.map(
      (customer) => new Customer(customer.id, customer.full_name),
    );
  }

  async getOne(id: string): Promise<Customer> {
    const client = this.databaseService.getClient();

    const { data } = await client
      .schema('public')
      .from(CustomerRepository.TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    const customersData = data as Tables<'customers'>;

    return new Customer(customersData.id, customersData.full_name);
  }
}
