import { useAtom } from 'jotai';

import { useTableStateMolecule } from '../../Table.hook';
import { TableCell } from '../../TableCell/TableCell.component';
import { headerCellStyle } from './TableHeaderCell.css';
import type { ITableHeaderCell } from './TableHeaderCell.interface';
import { TableHeaderCellLabel } from './TableHeaderCellLabel/TableHeaderCellLabel.component';

export const TableHeaderCell: React.FC<ITableHeaderCell> = ({ name, type, render, sortable = false }) => {
  const stateMolecule = useTableStateMolecule();

  const [orderBy, setOrderBy] = useAtom(stateMolecule.orderBy);
  const [descending, setDescending] = useAtom(stateMolecule.descending);

  const onClick = () => {
    if (!sortable) return;

    if (orderBy === type) {
      setDescending((prev) => !prev);
    } else {
      setOrderBy(type);
    }
  };

  return (
    <TableCell className={headerCellStyle}>
      {render ? (
        render()
      ) : (
        <TableHeaderCellLabel active={type === orderBy} onClick={onClick} sortable={sortable} descending={descending}>
          {name}
        </TableHeaderCellLabel>
      )}
    </TableCell>
  );
};
