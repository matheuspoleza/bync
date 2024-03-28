import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CustomerID, ZodValidationPipe } from '../common';
import { UserCreatedWebhookRequest } from './dtos/create-user-webhook-request.dto';
import { CustomerRepository } from './customer.repository';

@Controller('identity')
export class IdentityController {
  constructor(private customerRepository: CustomerRepository) {}

  @Get('me')
  async me(@CustomerID() customerID: string) {
    return this.customerRepository.getOne(customerID);
  }

  @Post('customer')
  @UsePipes(new ZodValidationPipe(UserCreatedWebhookRequest))
  async createCustomer(@Body() body: UserCreatedWebhookRequest) {
    const userID = body.record.id;
    const fullName = body.record.raw_user_meta_data.full_name;

    if (!userID) {
      throw new Error('User not found');
    }

    if (!fullName) {
      throw new Error('User name not defined');
    }

    await this.customerRepository.createOne(userID, fullName);
  }
}
