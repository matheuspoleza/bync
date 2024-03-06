import { Injectable } from '@nestjs/common';
import { CustomerDTO } from 'src/domain/customer';
import { CustomerRepository } from 'src/infrastructure/repositories/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async getCustomer(customerID: string) {
    return this.customerRepository.getOne(customerID);
  }

  async createCustomer(userID: string, fullName: string) {
    return this.customerRepository.createOne(userID, fullName);
  }
}
