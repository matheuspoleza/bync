import { useAtomValue } from 'jotai';

import { memo } from '@/hocs';

import { useTable } from '../../Table.hook';
import type { TableItem } from '../../Table.interface';
import { TableCell } from '../../TableCell/TableCell.component';
import type { ITableRowColumns } from './TableRowColumns.interface';

export const TableRowColumns = memo(
  'TableRowColumns',
  (prev: Readonly<ITableRowColumns<any, string>>, next: Readonly<ITableRowColumns<any, string>>) =>
    // add any props that should trigger a re-render here
    prev.itemAtom === next.itemAtom
)(
  <ColumnType extends string, Item extends TableItem, SortContext = unknown>({
    itemAtom,
    onCellDoubleClicked,
  }: ITableRowColumns<Item, ColumnType>): React.ReactElement => {
    const { config, columnsOrderAtom } = useTable<ColumnType, Item, SortContext>();

    const item = useAtomValue(itemAtom);
    const columnsOrder = useAtomValue(columnsOrderAtom);

    return (
      <>
        {columnsOrder.map(({ type }, index) => (
          <TableCell key={index} onDoubleClick={() => onCellDoubleClicked?.({ itemID: item.id, columnType: type })}>
            {config.columns[type].cell({
              item,
              type,
              index,
              isLast: index === columnsOrder.length - 1,
              isFirst: index === 0,
            })}
          </TableCell>
        ))}
      </>
    );
  }
);
