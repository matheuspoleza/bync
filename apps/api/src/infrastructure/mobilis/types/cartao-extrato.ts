import { CartaoDespesa, IDespesaCartao } from './cartao-despesa';

export interface ICartaoExtrato {
  cartaoCreditoId: number;
  despesaCartaos: IDespesaCartao[];
  totalFatura: number;
  valorPago: number;
  statusFatura: number;
  dataFechamento: string;
}

export class CartaoExtrato implements ICartaoExtrato {
  cartaoCreditoId: number;
  despesaCartaos: CartaoDespesa[];
  totalFatura: number;
  valorPago: number;
  statusFatura: number;
  dataFechamento: string;

  constructor(data: ICartaoExtrato) {
    this.cartaoCreditoId = data.cartaoCreditoId;
    this.despesaCartaos = data.despesaCartaos.map(
      (dc) => new CartaoDespesa(dc),
    );
    this.totalFatura = data.totalFatura;
    this.valorPago = data.valorPago;
    this.statusFatura = data.statusFatura;
    this.dataFechamento = data.dataFechamento;
  }
}
