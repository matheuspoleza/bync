import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/database/database.service';
import { Tables } from '../common/database/database.types';

@Injectable()
export class CustomerRepository {
  static TABLE_NAME = 'customers';

  constructor(private databaseService: DatabaseService) {}

  async getAll(): Promise<any[]> {
    const { data } = await this.databaseService.client
      .schema('public')
      .from(CustomerRepository.TABLE_NAME)
      .select('*');

    if (!data) return [];

    return data.map((customer) => ({
      id: customer.id,
      fullName: customer.full_name,
    }));
  }

  async getOne(id: string): Promise<any> {
    const { data } = await this.databaseService.client
      .schema('public')
      .from(CustomerRepository.TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    const customersData = data as Tables<'customers'>;

    return { id: customersData.id, fullName: customersData.full_name };
  }

  async getOneByUserID(id: string): Promise<any> {
    const { data } = await this.databaseService.client
      .schema('public')
      .from(CustomerRepository.TABLE_NAME)
      .select('*')
      .eq('user_id', id)
      .single();

    return { id: data.id, fullName: data.full_name };
  }

  async createOne(userID: string, fullName: string): Promise<any> {
    const { data } = await this.databaseService.client
      .schema('public')
      .from(CustomerRepository.TABLE_NAME)
      .insert({ full_name: fullName, user_id: userID })
      .select()
      .single();

    return { id: data.id, fullName: data.full_name };
  }
}
