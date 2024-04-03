import { Controller, Get } from '@nestjs/common';
import { CustomerId, ZodApiBody } from '../common';
import { CustomerRepository } from './customer.repository';
import { ApiTags } from '@nestjs/swagger';
import { GetCustomerResponse } from './schema/get-customer.request';

@Controller('identity')
@ApiTags('identity')
export class IdentityController {
  constructor(private customerRepository: CustomerRepository) {}

  @Get('me')
  @ZodApiBody({ schema: GetCustomerResponse })
  async me(@CustomerId() customerId: string) {
    return this.customerRepository.getOne(customerId);
  }
}
