import type { IconName } from '@bync/icons';
import { useState } from 'react';

import { Dropdown } from '@/components/Form/Dropdown';
import { Menu, MenuItem, Search } from '@/components/Navigation/Menu';
import { Divider } from '@/components/Other/Divider';
import { Box } from '@/components/Utility/Box';
import { FieldLabel } from '@/pages/components/FieldLabel';
import type { BaseProps } from '@/types';

import { dropdownFieldStyles } from './VariableDataTypeSelect.css';

export interface IDataTypeSelect extends BaseProps {
  error?: boolean;
  onFocus?: () => void;
  onDropdownChange: (value: IOption) => void;
  width?: string;
}

interface IOption {
  label: string;
  value: string;
  iconName?: IconName;
}

const DATA_TYPES: IOption[] = [{ label: 'String', value: 'string', iconName: 'Text' }];

export const VariableDataTypeSelect: React.FC<IDataTypeSelect> = ({
  onDropdownChange,
  error = false,
  onFocus,
  width,
  testID,
}) => {
  const [dataType, setDataType] = useState<IOption | null>({ label: 'Text', value: 'Text', iconName: 'Text' });

  return (
    <Box direction="column">
      <FieldLabel>Type</FieldLabel>
      <Dropdown
        error={error}
        width={width}
        prefixIconName="Text"
        onFocus={onFocus}
        errorMessage={error ? 'Data type is required.' : ''}
        disabled={true}
        value={dataType?.value || ''}
        placeholder="Select type"
        className={dropdownFieldStyles}
        testID={testID}
      >
        {({ onClose }) => (
          <Menu
            searchSection={<Search onValueChange={() => null} placeholder="Search" value="" key={1} />}
            numberOfItemsToShow={6}
          >
            <MenuItem searchValue="" key="custom" label="Custom text" id="00" />
            <Divider fullWidth />
            {DATA_TYPES.map((item) => (
              <MenuItem
                searchValue=""
                key={item.value}
                label={item.label}
                id={item.value}
                onClick={() => {
                  onDropdownChange(item);
                  setDataType(item);
                  onClose();
                }}
              />
            ))}
          </Menu>
        )}
      </Dropdown>
    </Box>
  );
};
