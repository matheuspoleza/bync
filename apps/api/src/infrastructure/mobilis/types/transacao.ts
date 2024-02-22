import { IMovimentacao, Movimentacao } from './movimentacao';

export interface ITransacao {
  balancoMensal: number;
  despesaTotal: number;
  movimentacoes: IMovimentacao[];
  receitaTotal: number;
  saldo: number;
  transferenciaEntrada: number;
  transferenciaSaida: number;
}

export class Transacao implements ITransacao {
  balancoMensal: number;
  despesaTotal: number;
  movimentacoes: Movimentacao[];
  receitaTotal: number;
  saldo: number;
  transferenciaEntrada: number;
  transferenciaSaida: number;

  constructor(data: ITransacao) {
    Object.assign(this, data);
    this.movimentacoes = data.movimentacoes.map(
      (movimentacao) => new Movimentacao(movimentacao),
    );
  }
}
