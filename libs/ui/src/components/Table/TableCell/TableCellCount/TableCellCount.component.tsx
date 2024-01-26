import { Text } from '@/components/Text';

import { countStyle } from './TableCellCount.css';
import type { ITableCellCount } from './TableCellCount.interface';

export const TableCellCount: React.FC<ITableCellCount> = ({ count }) => (
  <Text className={countStyle}>{`(${count})`}</Text>
);
