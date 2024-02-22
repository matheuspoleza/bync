import { Injectable } from '@nestjs/common';
import { CartaoExtrato } from './types/cartao-extrato';
import { CartaoStatus } from './types/cartao-status';
import { BaseMobilisAPI } from './base';
import { CartaoDespesa } from './types/cartao-despesa';

@Injectable()
export class MobilisAPIV2 extends BaseMobilisAPI {
  static VERSION = '2';

  constructor() {
    super(MobilisAPIV2.VERSION);
  }

  async getFaturas(month: number, year: number): Promise<CartaoStatus[]> {
    return this.get<CartaoStatus[]>(
      `/CartaoCredito/StatusFatura?Month=${month}&Year=${year}&MonthlyView=false`,
    );
  }

  async getExtrato(
    faturaID: number,
    month: number,
    year: number,
  ): Promise<CartaoExtrato> {
    return this.get<CartaoExtrato>(
      `/CartaoCredito/${faturaID}/Extrato?Month=${month}&Year=${year}`,
    );
  }

  async getAllCreditCardDebitsBetween(
    startDate: Date,
    endDate: Date,
  ): Promise<CartaoDespesa[]> {
    let debits: CartaoDespesa[] = [];
    let currentYear = startDate.getFullYear();
    let currentMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth() + 2;

    const months = [];

    if (currentMonth === 0) {
      currentMonth = 12;
      currentYear--;
    }

    while (
      currentYear < endYear ||
      (currentYear === endYear && currentMonth <= endMonth)
    ) {
      months.push({ month: currentMonth, year: currentYear });

      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }
    }

    for (const { month, year } of months) {
      const faturas = await this.getFaturas(month, year);
      for (const fatura of faturas) {
        const extrato = await this.getExtrato(fatura.id, month, year);
        debits = [...debits, ...extrato.despesaCartaos];
      }
    }

    debits = debits.filter((debit) => {
      const debitDate = new Date(debit.dataDespesa);
      return debitDate >= startDate && debitDate <= endDate;
    });

    return debits.map((despesaData) => new CartaoDespesa(despesaData));
  }
}
