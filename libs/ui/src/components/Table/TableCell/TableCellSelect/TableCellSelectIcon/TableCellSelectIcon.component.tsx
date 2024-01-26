import { Icon } from '@/components/Media/Icon';
import { Box } from '@/components/Utility/Box';

import type { ITableCellSelectIcon } from './TableCellSelectIcon.interface';

export const TableCellSelectIcon: React.FC<ITableCellSelectIcon> = ({ name, className }) => (
  <Box className={className}>
    <Icon name={name} width={24} height={24} />
  </Box>
);
