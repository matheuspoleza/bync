import { Text } from '@/components/Text/Text.component';
import { Box } from '@/components/Utility/Box/Box.component';
import { Tokens } from '@/styles';

import { MenuItem } from '../MenuItem';
import { textStyles } from './CreateItem.css';
import type { ICreateItem } from './CreateItem.interface';

export const CreateItem: React.FC<ICreateItem> = ({ label, ...props }) => (
  <MenuItem
    {...props}
    label={
      <Box gap={4}>
        <Text className={textStyles} color={Tokens.colors.neutralDark.neutralsDark100}>
          Add{' '}
        </Text>

        <Text className={textStyles} overflow>
          '{label}'
        </Text>
      </Box>
    }
  />
);
