import { Controller, Get } from '@nestjs/common';
import { CustomerId } from '../common';
import { CustomerRepository } from './customer.repository';
import { ApiTags } from '@nestjs/swagger';

@Controller('identity')
@ApiTags('identity')
export class IdentityController {
  constructor(private customerRepository: CustomerRepository) {}

  @Get('me')
  async me(@CustomerId() customerId: string) {
    return this.customerRepository.getOne(customerId);
  }
}
