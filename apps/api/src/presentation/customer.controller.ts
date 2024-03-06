import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CustomerService } from 'src/application/customer.service';
import { CustomerID } from './common';
import { UserCreatedWebhookRequest } from './dtos/create-user-webhook-request.dto';
import { ZodValidationPipe } from './common/zod-validation.pipe';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('me')
  async me(@CustomerID() customerID: string) {
    return this.customerService.getCustomer(customerID);
  }

  @Post()
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

    await this.customerService.createCustomer(userID, fullName);
  }
}
