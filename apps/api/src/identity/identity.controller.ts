import { Controller, Get } from '@nestjs/common';
import { CustomerID } from '../common';
import { CustomerRepository } from './customer.repository';

@Controller('identity')
export class IdentityController {
  constructor(private customerRepository: CustomerRepository) {}

  @Get('me')
  async me(@CustomerID() customerID: string) {
    return this.customerRepository.getOne(customerID);
  }
}
