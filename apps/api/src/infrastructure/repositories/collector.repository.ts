import { MobilisRepository } from 'src/infrastructure/mobilis/mobilis.repository';
import { CollectorAccountData } from '../../domain/collector-account';
import { Transaction } from 'src/infrastructure/mobilis/types/transaction';
import { BankAccount } from 'src/domain/bank-account';
import { Injectable } from '@nestjs/common';

type CollectorDateRange = {
  startDate: Date;
  endDate: Date;
};

@Injectable()
export class CollectorRepository {
  constructor(private readonly mobilisRepository: MobilisRepository) {}

  async runCrawlerForBankingTransactions({
    startDate,
    endDate,
    bankAccounts,
  }: CollectorDateRange & { bankAccounts?: BankAccount[] }): Promise<
    CollectorAccountData<Transaction>[]
  > {
    const allTransactions =
      await this.mobilisRepository.getAllTransactionsBetween(
        startDate,
        endDate,
      );

    return bankAccounts.reduce((acc, account) => {
      const transactions = allTransactions.filter((transaction) =>
        transaction.isFromAccount(Number(account.id ?? '1')),
      );

      return [
        ...acc,
        new CollectorAccountData(account.id, account.customerID, transactions),
      ];
    }, []);
  }
}
