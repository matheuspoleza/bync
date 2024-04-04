import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { BankingModule } from 'src/banking/banking.module';
import { BelvoModule } from 'src/belvo/belvo.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [BankingModule, BelvoModule],
})
export class AdminModule {}
