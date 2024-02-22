import { Injectable } from '@nestjs/common';
import { BaseMobilisAPI } from './base';
import { Movimentacao } from './types/movimentacao';
import {
  IMovimentacaoFiltroSearch,
  IMovimentacoesFiltro,
} from './types/filtro';
import {
  Instant,
  LocalDate,
  LocalDateTime,
  ZoneOffset,
  nativeJs,
} from '@js-joda/core';
import { Transacao } from './types/transacao';

@Injectable()
export class MobilisAPIV1 extends BaseMobilisAPI {
  private getStartOfDay(date: Date): LocalDateTime {
    const instant = Instant.from(nativeJs(date));
    const zonedDate = instant.atZone(ZoneOffset.UTC);
    return zonedDate.toLocalDate().atStartOfDay();
  }

  private getEndOfDay(date: Date): LocalDateTime {
    const instant = Instant.from(nativeJs(date));
    const zonedDate = instant.atZone(ZoneOffset.UTC);
    return zonedDate.toLocalDate().plusDays(1).atTime(23, 59);
  }

  private isDateBetween(
    inputDateString: string,
    startDate: LocalDateTime,
    endDate: LocalDateTime,
  ): boolean {
    const inputDate = LocalDate.parse(inputDateString.split('T')[0]);
    const inputDateTime = inputDate.atStartOfDay();

    return (
      (inputDateTime.equals(startDate) || inputDateTime.isAfter(startDate)) &&
      (inputDateTime.equals(endDate) || inputDateTime.isBefore(endDate))
    );
  }

  async fetchMovimentacoes(month: number, year: number): Promise<Transacao> {
    return this.get<Transacao>(`/Transacoes?mes=${month}&ano=${year}`);
  }

  async getAllBankingTransactionsBetween(
    initialDate: Date,
    finalDate: Date,
  ): Promise<{ saldo: number; movimentacoes: Movimentacao[] }> {
    const startDate = this.getStartOfDay(initialDate);
    const endDate = this.getEndOfDay(finalDate);

    let transactions: Movimentacao[] = [];
    let allTransactions: Movimentacao[] = null;
    let saldo = 0;

    const search: IMovimentacaoFiltroSearch = {
      categorias: [],
      contas: [],
      dataFinal: startDate.toString(),
      dataInicial: endDate.toString(),
      descricao: '',
      id: null,
      recompensaId: 7,
      statusLista: [],
      subCategorias: [],
      tags: [],
      tipoMovimentacoes: [],
    };

    try {
      const { movimentacoes, balancoMensal } =
        await this.post<IMovimentacoesFiltro>('/Transacoes/Filtros', search);
      transactions = movimentacoes;
      saldo = balancoMensal;
    } catch (e) {
      const { movimentacoes, saldo: balanco } = await this.fetchMovimentacoes(
        startDate.month().value(),
        startDate.year(),
      );

      allTransactions = movimentacoes;
      saldo = balanco;
    }

    if (allTransactions.length > 0) {
      allTransactions = allTransactions
        .filter((movimentacao) => !movimentacao.cartaoCreditoId)
        .filter((movimentacao) =>
          this.isDateBetween(movimentacao.dataMovimentacao, startDate, endDate),
        )
        .map((movimentacaoData) => new Movimentacao(movimentacaoData));
    }

    transactions = transactions
      .map((movimentacaoData) => new Movimentacao(movimentacaoData))
      .filter((movimentacao) => !movimentacao.cartaoCreditoId);

    const result = allTransactions.length > 0 ? allTransactions : transactions;

    return {
      movimentacoes: result,
      saldo,
    };
  }
}
