import { useAtomValue } from 'jotai';

import { forwardRef, memo } from '@/hocs';
import { usePersistFunction } from '@/hooks';

import { useTableSelectedItems, useTableStateMolecule } from '../Table.hook';
import type { TableItem } from '../Table.interface';
import type { ITableRow } from './TableRow.interface';
import { TableRowOptimized } from './TableRowOptimized/TableRowOptimized.component';

export const TableRow = memo(
  'TableRow',
  (prev: ITableRow<any, string>, next: ITableRow<any, string>) =>
    // add any props that should trigger a re-render here
    prev.id === next.id && prev.index === next.index && prev.itemAtom === next.itemAtom
)(
  forwardRef<HTMLDivElement>('TableRow')(
    <ColumnType extends string, Item extends TableItem, SortContext = unknown>(
      { id, index, onClick: onClickProp, itemAtom, rowContextMenu, onCellDoubleClicked }: ITableRow<Item, ColumnType>,
      ref: React.ForwardedRef<HTMLDivElement>
    ) => {
      const stateMolecule = useTableStateMolecule<ColumnType>();

      const activeID = useAtomValue(stateMolecule.activeID);
      const hoveringID = useAtomValue(stateMolecule.hoveringID);
      const { hasSelected, onToggleSelected } = useTableSelectedItems(id);

      const onClick = usePersistFunction((event: React.MouseEvent<HTMLDivElement>) => {
        // prevents double click from triggering onClick
        if (event.detail > 1) return;

        if (hasSelected) {
          onToggleSelected();
        } else {
          onClickProp?.(id, event);
        }
      });

      const canClick = !!onClickProp || hasSelected;

      return (
        <TableRowOptimized<ColumnType, Item, SortContext>
          id={id}
          ref={ref}
          index={index}
          onClick={canClick ? onClick : undefined}
          isActive={id === activeID}
          canClick={canClick}
          itemAtom={itemAtom}
          isHovering={id === hoveringID}
          rowContextMenu={rowContextMenu}
          onCellDoubleClicked={onCellDoubleClicked}
        />
      );
    }
  )
);
