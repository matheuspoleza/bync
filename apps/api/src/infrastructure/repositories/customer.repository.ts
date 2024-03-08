import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../__v2__/common/database/database.service';
import { ICustomerRepository, Customer } from 'src/domain/customer';
import { Tables } from '../../__v2__/common/database/database.types';

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

  async getOneByUserID(id: string): Promise<Customer> {
    const client = this.databaseService.getClient();

    const { data } = await client
      .schema('public')
      .from(CustomerRepository.TABLE_NAME)
      .select('*')
      .eq('user_id', id)
      .single();

    const customersData = data as Tables<'customers'>;

    return new Customer(customersData.id, customersData.full_name);
  }

  async createOne(userID: string, fullName: string): Promise<Customer> {
    const client = this.databaseService.getClient();

    const { data } = await client
      .schema('public')
      .from(CustomerRepository.TABLE_NAME)
      .insert({ full_name: fullName, user_id: userID })
      .select();

    const createdCustomer = data[0] as Tables<'customers'>;

    return new Customer(createdCustomer.id, createdCustomer.full_name);
  }
}
