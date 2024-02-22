import { CartaoDespesa } from './cartao-despesa';
import { Movimentacao } from './movimentacao';

export type ITransaction = Movimentacao | CartaoDespesa;

export class Transaction {
  constructor(public data: ITransaction) {}

  isFromAccount(accountId: number): boolean {
    if (this.data instanceof Movimentacao) {
      return this.data.contaId === accountId;
    }

    if (this.data instanceof CartaoDespesa) {
      return this.data.cartaoCreditoId === accountId;
    }

    return (this.data as any).contaId === accountId;
  }
}
