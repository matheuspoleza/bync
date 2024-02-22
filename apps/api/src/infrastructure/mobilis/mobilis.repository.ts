import { Injectable } from '@nestjs/common';
import { MobilisWeb } from './web';
import { MobilisAPIV1 } from './v1';
import { MobilisAPIV2 } from './v2';
import { Transaction } from './types/transaction';

@Injectable()
export class MobilisRepository {
  constructor(
    private readonly mobilisV1: MobilisAPIV1,
    private readonly mobilisV2: MobilisAPIV2,
    private readonly mobilisWeb: MobilisWeb,
  ) {}

  public getAllTransactionsBetween(startDate: Date, endDate: Date) {
    return this.mobilisWeb.runInBrowser(async ({ token }) => {
      this.mobilisV1.updateToken(token);
      this.mobilisV2.updateToken(token);

      const [bankingTransactions, creditCardDebts] = await Promise.all([
        (
          await this.mobilisV1.getAllBankingTransactionsBetween(
            startDate,
            endDate,
          )
        ).movimentacoes,
        this.mobilisV2.getAllCreditCardDebitsBetween(startDate, endDate),
      ]);

      return [...bankingTransactions, ...creditCardDebts].map(
        (data) => new Transaction(data),
      );
    });
  }
}
