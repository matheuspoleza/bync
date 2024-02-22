export interface IMovimentacao {
  anexo: any;
  cartaoCreditoId: number;
  conta: Conta;
  contaId: number;
  controleRepeticaoDespesa: any;
  controleRepeticaoReceita: any;
  dataMovimentacao: string;
  descricao: string;
  descricaoValidadoRepeticao: string;
  despesaCartaoId: number;
  despesaFixaId: any;
  despesaId: number;
  favorito: any;
  id: number;
  ignorada: boolean;
  importarMovimentacao: boolean;
  isFaturaCartao: boolean;
  isFaturaCartaoAuto: boolean;
  isMovimentacaoFixa: boolean;
  observacao: any;
  origemIntegracaoId: number;
  outraConta: any;
  outraContaId: any;
  pagamentoAvancadoCartaoId: any;
  pagamentoParcialCartaoId: any;
  pagamentoRecebidoCartaoAuto: boolean;
  provavelDuplicacao: boolean;
  receitaFixaId: any;
  receitaId: any;
  status: number;
  subcategoriaId: any;
  tags: string[];
  tipoDespesa: ITipoDespesa;
  tipoDespesaId: number;
  tipoMovimentacao: number;
  tipoReceita: any;
  tipoReceitaId: number;
  transferenciaId: any;
  uniqueId: string;
  valor: number;
}

export interface IConta {
  arquivado: boolean;
  ativo: boolean;
  convertida: any; // Tipo não especificado nos dados
  cor: number;
  dataContaAutomatica: string;
  dataCriacao: string;
  dataModificacao: string;
  id: number;
  instituicaoBancariaAutenticacaoId: number;
  instituicaoBancariaId: string;
  isAutomatic: boolean;
  nome: string;
  origemIntegracaoId: number;
  saldo: number;
  statusIntegracao: number;
  telaInicial: boolean;
  tipoConta: number;
  tokenSincronizacao: any; // Tipo não especificado nos dados
  uniqueId: string;
  usuarioId: string;
}

export interface ITipoDespesa {
  arquivado: boolean;
  ativo: boolean;
  cor: number;
  dataCriacao: string;
  dataModificacao: string;
  icon: number;
  id: number;
  nome: string;
  tipo: number;
  tipoDespesaPaiId: any; // Tipo não especificado nos dados
  tokenSincronizacao: any; // Tipo não especificado nos dados
  usuarioId: string;
}

export class Conta implements IConta {
  arquivado: boolean;
  ativo: boolean;
  convertida: any;
  cor: number;
  dataContaAutomatica: string;
  dataCriacao: string;
  dataModificacao: string;
  id: number;
  instituicaoBancariaAutenticacaoId: number;
  instituicaoBancariaId: string;
  isAutomatic: boolean;
  nome: string;
  origemIntegracaoId: number;
  saldo: number;
  statusIntegracao: number;
  telaInicial: boolean;
  tipoConta: number;
  tokenSincronizacao: any;
  uniqueId: string;
  usuarioId: string;

  constructor(data: IConta) {
    Object.assign(this, data);
  }
}

export class Movimentacao implements IMovimentacao {
  anexo: any;
  cartaoCreditoId: number;
  conta: Conta;
  contaId: number;
  controleRepeticaoDespesa: any;
  controleRepeticaoReceita: any;
  dataMovimentacao: string;
  descricao: string;
  descricaoValidadoRepeticao: string;
  despesaCartaoId: number;
  despesaFixaId: any;
  despesaId: number;
  favorito: any;
  id: number;
  ignorada: boolean;
  importarMovimentacao: boolean;
  isFaturaCartao: boolean;
  isFaturaCartaoAuto: boolean;
  isMovimentacaoFixa: boolean;
  observacao: any;
  origemIntegracaoId: number;
  outraConta: any;
  outraContaId: any;
  pagamentoAvancadoCartaoId: any;
  pagamentoParcialCartaoId: any;
  pagamentoRecebidoCartaoAuto: boolean;
  provavelDuplicacao: boolean;
  receitaFixaId: any;
  receitaId: any;
  status: number;
  subcategoriaId: any;
  tags: string[];
  tipoDespesa: ITipoDespesa;
  tipoDespesaId: number;
  tipoMovimentacao: number;
  tipoReceita: any;
  tipoReceitaId: number;
  transferenciaId: any;
  uniqueId: string;
  valor: number;

  constructor(data: IMovimentacao) {
    Object.assign(this, {
      ...data,
      valor: data.despesaId ? -Math.abs(data.valor) : data.valor,
    });
  }
}

export class TipoDespesa implements ITipoDespesa {
  arquivado: boolean;
  ativo: boolean;
  cor: number;
  dataCriacao: string;
  dataModificacao: string;
  icon: number;
  id: number;
  nome: string;
  tipo: number;
  tipoDespesaPaiId: any;
  tokenSincronizacao: any;
  usuarioId: string;

  constructor(data: ITipoDespesa) {
    Object.assign(this, data);
  }
}
