import { atom } from 'jotai';
import { makeData } from './__fixtures__';
import { Table } from '@bync/ui';

export const itemsAtom = atom(makeData());

export const updateItemsAtom = Table.Utils.updateItemAtom(itemsAtom);

export const columnsOrderAtom = atom([
  { type: 'select', size: Table.Header.Cell.Select.CELL_WIDTH },
  { type: 'name', size: '2fr' },
  { type: 'link', size: '3fr' },
  { type: 'text' },
  { type: 'date' },
]);
