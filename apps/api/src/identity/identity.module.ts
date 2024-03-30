import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { CustomerRepository } from './customer.repository';

@Module({
  controllers: [IdentityController],
  providers: [CustomerRepository],
  exports: [CustomerRepository],
})
export class IdentityModule {}
