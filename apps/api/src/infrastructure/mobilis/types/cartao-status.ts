import { CartaoFatura } from './cartao-fatura';

export interface IStatusCartao {
  id: number;
  nome: string;
  limite: number;
  bandeira: number;
  diaPagamento: number;
  diaFechamento: number;
  contaId: number;
  emissorId: number;
  instituicaoBancariaId: string;
  instituicaoBancariaAutenticacaoId: number;
  arquivado: boolean;
  limiteParcial: number;
  porcentualLimite: number;
  cor: string;
  origemIntegracaoId: number;
  statusIntegracao: number;
  dataCartaoAutomatico: string;
  fatura: CartaoFatura;
  faturaAberta: CartaoFatura;
}

export class CartaoStatus implements IStatusCartao {
  id: number;
  nome: string;
  limite: number;
  bandeira: number;
  diaPagamento: number;
  diaFechamento: number;
  contaId: number;
  emissorId: number;
  instituicaoBancariaId: string;
  instituicaoBancariaAutenticacaoId: number;
  arquivado: boolean;
  limiteParcial: number;
  porcentualLimite: number;
  cor: string;
  origemIntegracaoId: number;
  statusIntegracao: number;
  dataCartaoAutomatico: string;
  fatura: CartaoFatura;
  faturaAberta: CartaoFatura;

  constructor(data: IStatusCartao) {
    Object.assign(this, data);
    this.fatura = new CartaoFatura(data.fatura);
    this.faturaAberta = new CartaoFatura(data.fatura);
  }
}
