import { IMovimentacao } from './movimentacao';

export interface IMovimentacaoFiltroSearch {
  categorias: any[];
  subCategorias: any[];
  contas: any[];
  statusLista: any[];
  tags: string[];
  dataInicial: string;
  dataFinal: string;
  descricao: string;
  id: number | null;
  tipoMovimentacoes: any[];
  recompensaId: number;
}

export interface IMovimentacoesFiltro {
  categoriaId: number;
  contaId: number;
  categorias: any;
  contas: any;
  statusLista: any;
  tipoMovimentacoes: any;
  status: number;
  tipoMovimentacaoId: number;
  mes: number;
  ano: number;
  periodoPersonalizado: boolean;
  dataInicial: string;
  dataFinal: string;
  despesaTotal: number;
  receitaTotal: number;
  transferenciaEntrada: number;
  transferenciaSaida: number;
  balancoMensal: number;
  periodoViewModel: any;
  pontosMobills: number;
  movimentacoes: IMovimentacao[];
}
