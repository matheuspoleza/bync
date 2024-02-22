export interface IDespesaCartao {
  id: number;
  descricao: string;
  descricaoValidadoRepeticao: string;
  valor: number;
  dataDespesa: string;
  tipoDespesaId: number;
  subcategoriaId: number;
  cartaoCreditoId: number;
  recorrente: number;
  despesaCartaoPaiId: number;
  despesaCartaoFilhaId: number;
  observacao: string | null;
  despesaCartaoFixaId: number | null;
  controleRepeticaoDespesaCartao: any;
  origemIntegracaoId: number;
  despesaAntecipada: boolean;
  tags: string[];
  pagamentoAdiantado: boolean;
  pagamentoParcial: boolean;
  pagamentoRecebidoCartaoAuto: boolean;
  ignorada: boolean;
}

export class CartaoDespesa implements IDespesaCartao {
  id: number;
  descricao: string;
  descricaoValidadoRepeticao: string;
  valor: number;
  dataDespesa: string;
  tipoDespesaId: number;
  subcategoriaId: number;
  cartaoCreditoId: number;
  recorrente: number;
  despesaCartaoPaiId: number;
  despesaCartaoFilhaId: number;
  observacao: string;
  despesaCartaoFixaId: number;
  controleRepeticaoDespesaCartao: any;
  origemIntegracaoId: number;
  despesaAntecipada: boolean;
  tags: string[];
  pagamentoAdiantado: boolean;
  pagamentoParcial: boolean;
  pagamentoRecebidoCartaoAuto: boolean;
  ignorada: boolean;

  constructor(data: IDespesaCartao) {
    Object.assign(this, {
      ...data,
      valor: data.valor * -1,
    });
  }
}
