import { useAtomValue } from 'jotai';

import { memo } from '@/hocs';

import { useTable } from '../Table.hook';
import { tableHeaderStyle } from './TableHeader.css';
import { TableHeaderCell } from './TableHeaderCell';

export const TableHeader = memo('TableHeader')(() => {
  const { config, columnsOrderAtom, gridTemplateColumns } = useTable();

  const columnsOrder = useAtomValue(columnsOrderAtom);

  return (
    <div style={{ gridTemplateColumns }} className={tableHeaderStyle}>
      {columnsOrder.map(({ type }) => (
        <TableHeaderCell
          key={type}
          type={type}
          name={config.columns[type].name}
          render={config.columns[type].header}
          sortable={!!config.columns[type].sorter}
        />
      ))}
    </div>
  );
});
