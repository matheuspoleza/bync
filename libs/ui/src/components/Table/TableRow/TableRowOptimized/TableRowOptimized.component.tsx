/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSetAtom } from 'jotai';

import { ContextMenu } from '@/components/Navigation';
import { forwardRef, memo } from '@/hocs';
import { composeRefs } from '@/utils/ref.util';

import { useTable, useTableStateMolecule } from '../../Table.hook';
import type { TableItem } from '../../Table.interface';
import { tableRowStyle } from '../TableRow.css';
import { TableRowColumns } from '../TableRowColumns/TableRowColumns.component';
import type { ITableRowOptimized } from './TableRowOptimized.interface';

export const TableRowOptimized = memo(
  'TableRowOptimized',
  (prev: ITableRowOptimized<any, string>, next: ITableRowOptimized<any, string>) =>
    // add any props that should trigger a re-render here
    prev.id === next.id &&
    prev.index === next.index &&
    prev.isActive === next.isActive &&
    prev.itemAtom === next.itemAtom &&
    prev.canClick === next.canClick &&
    prev.isHovering === next.isHovering
)(
  forwardRef<HTMLDivElement>('TableRowOptimized')(
    <ColumnType extends string, Item extends TableItem, SortContext = unknown>(
      {
        id,
        index,
        onClick,
        itemAtom,
        isActive,
        canClick,
        isHovering,
        rowContextMenu,
        onCellDoubleClicked,
      }: ITableRowOptimized<Item, ColumnType>,
      propRef: React.ForwardedRef<HTMLDivElement>
    ) => {
      const stateMolecule = useTableStateMolecule<ColumnType>();
      const { gridTemplateColumns } = useTable<ColumnType, Item, SortContext>();

      const setHoveringID = useSetAtom(stateMolecule.hoveringID);

      const renderRow = ({
        ref,
        isOpen,
        onContextMenu,
      }: {
        ref?: React.Ref<any>;
        isOpen?: boolean;
        onContextMenu?: React.MouseEventHandler<any>;
      } = {}) => (
        <div
          ref={composeRefs(propRef, ref)}
          style={{ gridTemplateColumns }}
          onClick={onClick}
          className={tableRowStyle({ isActive, canClick, isHovering: isHovering || isOpen })}
          data-index={index}
          onMouseEnter={() => setHoveringID(id)}
          onMouseLeave={() => setHoveringID(null)}
          onContextMenu={onContextMenu}
        >
          <TableRowColumns itemAtom={itemAtom} onCellDoubleClicked={onCellDoubleClicked} />
        </div>
      );

      return rowContextMenu ? (
        <ContextMenu referenceElement={renderRow} width={133} maxHeight={300}>
          {({ onClose }) => rowContextMenu({ id, onClose })}
        </ContextMenu>
      ) : (
        renderRow()
      );
    }
  )
);
