import { BankingAccountDto } from '../dto/banking-account.dto';

export interface BankingAccountAdapter {
  getAccounts(): BankingAccountDto[];
}
