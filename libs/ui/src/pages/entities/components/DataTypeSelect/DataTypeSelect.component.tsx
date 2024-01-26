import { useState } from 'react';

import { Dropdown } from '@/components/Form/Dropdown';
import { Menu, MenuItem, Search } from '@/components/Navigation/Menu';
import { Divider } from '@/components/Other/Divider';
import { Box } from '@/components/Utility/Box';
import { FieldLabel } from '@/pages/components/FieldLabel';

import { dropdownFieldStyles } from './DataTypeSelect.css';

export interface IDataTypeSelect {
  dataType?: string;
  isDisabled?: boolean;
  error?: boolean;
  onFocus?: () => void;
  onDropdownChange: (value: string | null) => void;
  width?: string;
}

const DATA_TYPES: { label: string; value: string }[] = [
  { label: 'Name', value: 'name' },
  { label: 'Email', value: 'email' },
  { label: 'Number', value: 'number' },
];

export const DataTypeSelect: React.FC<IDataTypeSelect> = ({
  onDropdownChange,
  isDisabled,
  error = false,
  onFocus,
  dataType: defaultType,
  width,
}) => {
  const [dataType, setDataType] = useState<string | null>(defaultType ?? null);

  return (
    <Box direction="column">
      <FieldLabel>Data type</FieldLabel>
      <Dropdown
        error={error}
        width={width}
        onFocus={onFocus}
        errorMessage={error ? 'Data type is required.' : ''}
        disabled={isDisabled}
        value={dataType}
        onChange={() => onDropdownChange(dataType)}
        placeholder="Select type"
        className={dropdownFieldStyles}
      >
        {({ onClose }) => (
          <Menu
            searchSection={<Search onValueChange={() => null} placeholder="Search" value="" key={1} />}
            numberOfItemsToShow={6}
          >
            <MenuItem
              searchValue=""
              key="custom"
              label="Custom text"
              id="00"
              onClick={() => {
                onDropdownChange('Custom text');
                setDataType('Custom text');
                onClose();
              }}
            />
            <Divider fullWidth />
            {DATA_TYPES.map((item) => (
              <MenuItem
                searchValue=""
                key={item.value}
                label={item.label}
                id={item.value}
                onClick={() => {
                  onDropdownChange(item.label);
                  setDataType(item.label);
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
