export interface ICartaoFatura {
  valorParcial: number;
  valorPago: number;
  status: number;
  dataFatura: string;
  dataPagamento: string;
  dataFechamento: string;
}

export class CartaoFatura implements ICartaoFatura {
  valorParcial: number;
  valorPago: number;
  status: number;
  dataFatura: string;
  dataPagamento: string;
  dataFechamento: string;

  constructor(data: ICartaoFatura) {
    Object.assign(this, data);
  }
}
