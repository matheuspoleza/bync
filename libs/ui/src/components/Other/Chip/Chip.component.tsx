import { SquareButton } from '@/components/Buttons/SquareButton';
import { Text } from '@/components/Text';
import type { IBox } from '@/components/Utility/Box';
import { Box } from '@/components/Utility/Box';

import { chipStyles, closeButtonStyles } from './Chip.css';

export interface IChip extends Omit<IBox, 'onChange'> {
  value: string;
  onDelete?: (value: string) => void;
}

export const Chip: React.FC<IChip> = ({ value, onDelete, ...props }) => {
  return (
    <Box {...props} className={chipStyles} align="center" mr={4} pl={onDelete ? 11 : 12} pr={onDelete ? 4 : 12}>
      <Text as="span">{value}</Text>
      {onDelete && (
        <SquareButton className={closeButtonStyles} size="small" iconName="CloseS" onClick={() => onDelete(value)} />
      )}
    </Box>
  );
};
