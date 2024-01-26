import { useState } from 'react';

import { Dropdown } from '@/components/Form';
import { Menu, MenuItem } from '@/components/Navigation';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';

import { FieldLabel } from '../../../../components/FieldLabel/FieldLabel.component';
import { captionStyles } from './RefreshRateSelect.css';

const RATES = [
  { label: 'Never', id: '0' },
  { label: 'Daily', id: '1' },
  { label: 'Weekly', id: '2' },
  { label: 'Monthly', id: '3' },
];

export interface IRefreshRateSelect {
  isDisabled?: boolean;
  onDropdownChange?: VoidFunction;
}

export const RefreshRateSelect: React.FC<IRefreshRateSelect> = ({ onDropdownChange, isDisabled }) => {
  const [rate, setRate] = useState<string>('Never');

  return (
    <Box direction="column">
      <FieldLabel>Refresh rate</FieldLabel>
      <Dropdown disabled={isDisabled} value={rate} onChange={onDropdownChange} placeholder="Select folder (optional)">
        {({ onClose }) => (
          <Menu>
            {RATES.map((item) => (
              <MenuItem
                key={item.id}
                label={item.label}
                id={item.id}
                onClick={() => {
                  setRate(item.label);
                  onClose();
                }}
              />
            ))}
          </Menu>
        )}
      </Dropdown>

      <Text className={captionStyles} variant="fieldCaption">
        How often will the data source sync.
      </Text>
    </Box>
  );
};
