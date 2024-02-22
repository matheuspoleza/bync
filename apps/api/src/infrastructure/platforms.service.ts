import { Injectable } from '@nestjs/common';
import { Transaction as MobilisTransaction } from './mobilis/types/transaction';
import { Transaction as YNABTransaction } from './ynab/types';
import { Movimentacao } from './mobilis/types/movimentacao';
import { CartaoDespesa } from './mobilis/types/cartao-despesa';

@Injectable()
export class PlatformsService {
  fromMobilisToYnab(mobilis: MobilisTransaction): YNABTransaction {
    const mobilisTransaction = mobilis.data;

    if (mobilisTransaction instanceof Movimentacao) {
      return {
        // transform to Milliunits
        amount: mobilisTransaction.valor * 1000,
        date: mobilisTransaction.dataMovimentacao,
        memo: mobilisTransaction.descricao,
        account_id: '',
        approved: true,
        cleared: 'cleared',
        flag_color: null,
        import_id: null,
        payee_id: null,
        payee_name: null,
        category_id: null,
      };
    }

    if (mobilisTransaction instanceof CartaoDespesa) {
      return {
        // transform to Milliunits
        amount: mobilisTransaction.valor * 1000,
        date: mobilisTransaction.dataDespesa,
        memo: mobilisTransaction.descricao,
        account_id: '',
        approved: true,
        cleared: 'cleared',
        flag_color: null,
        import_id: null,
        payee_id: null,
        payee_name: null,
        category_id: null,
      };
    }

    const data = mobilisTransaction as Movimentacao;

    return {
      // transform to Milliunits
      amount: data.valor * 1000,
      date: data.dataMovimentacao,
      memo: data.descricao,
      account_id: '',
      approved: true,
      cleared: 'cleared',
      flag_color: null,
      import_id: null,
      payee_id: null,
      payee_name: null,
      category_id: null,
    };
  }
}
