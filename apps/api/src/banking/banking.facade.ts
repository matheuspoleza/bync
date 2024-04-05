import { Injectable } from '@nestjs/common';

import { BankingService } from './application/banking.service';
import {
  BankAccountDto,
  BankAccountType,
} from './application/bank-account.dto';
import { TransactionsDto } from './application/transactions.dto';
import { BelvoFacade } from '../belvo/belvo.facade';
export abstract class BankAccountAdapter<T = unknown> {
  public accounts: T[] = [];
  abstract fromBanking(bankAccounts: BankAccountDto[]): T[];
  abstract toBanking(...params): BankAccountDto[];
}

@Injectable()
export class BankingFacade {
  constructor(
    private readonly bankingService: BankingService,
    private belvoFacade: BelvoFacade,
  ) {}

  async getAllLinkedAccounts<T = unknown>(
    adapter: BankAccountAdapter<T>,
  ): Promise<T[]> {
    const bankAccounts = await this.bankingService.getAllLinkedAccounts();

    const bankAccountDtos = bankAccounts.map<BankAccountDto>((bankAccount) => ({
      id: bankAccount.id,
      customerId: bankAccount.customerId,
      link: bankAccount.connectionLinkId,
      name: bankAccount.name,
      number: bankAccount.number,
      institution: bankAccount.institution,
      type: bankAccount.type as BankAccountType,
      balance: bankAccount.balance,
    }));

    return adapter.fromBanking(bankAccountDtos);
  }

  async getTransactionsBetween(
    bankAccountIds: string[],
    from: Date,
    to: Date,
  ): Promise<TransactionsDto> {
    let response: TransactionsDto = [];
    const bankAccounts = await this.bankingService.getAllByIds(bankAccountIds);
    const linkIds = new Set(
      bankAccounts.map((account) => account.connectionLinkId),
    );

    const transactionsByLink = await Promise.all(
      Array.from(linkIds).map(async (linkId) => {
        const transactions = await this.belvoFacade.getTransactionsBetween(
          linkId,
          from,
          to,
        );

        return {
          linkId,
          transactions,
        };
      }),
    );

    const allTransactions = transactionsByLink.flatMap(
      (result) => result.transactions,
    );

    for (const bankAccount of bankAccounts) {
      const transactions = allTransactions.filter((transaction) => {
        if (transaction.external_account_id) {
          return transaction.external_account_id === bankAccount.id;
        }

        return false;
      });

      response.push({
        bankAccountId: bankAccount.id,
        linkId: bankAccount.connectionLinkId,
        customerId: bankAccount.customerId,
        transactions,
      });
    }

    return response;
  }
}
