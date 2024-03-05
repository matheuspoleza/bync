import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from 'src/application/customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get(':customerID')
  async getOne(@Param('customerID') customerID: string) {
    return this.customerService.getCustomer(customerID);
  }
}
