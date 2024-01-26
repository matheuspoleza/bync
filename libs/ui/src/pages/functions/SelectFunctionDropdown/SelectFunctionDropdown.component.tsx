import { useState } from 'react';

import { ActionButtons, Dropdown, Menu, MenuItem, Search } from '@/components';

const exisitingFunctions = [
  { label: 'Cool Function' },
  { label: 'Cooler Function 2' },
  { label: 'Coolest Function 3' },
  { label: "Uncool obscenely long, and I'm talking long Function " },
];

interface ISelectFunctionDropdown {
  functionSelected?: number;
}

export const SelectFunctionDropdown: React.FC<ISelectFunctionDropdown> = ({ functionSelected }) => {
  const [selectedFunction, setSelectedFunction] = useState(
    functionSelected ? exisitingFunctions[functionSelected] : undefined
  );

  return (
    <Dropdown
      width="302px"
      prefixIconName={selectedFunction ? 'EditS' : undefined}
      value={selectedFunction?.label || ''}
      placeholder="Select existing function"
    >
      {() => (
        <Menu
          searchSection={<Search placeholder="Search" value="" onValueChange={() => null} />}
          actionButtons={
            <ActionButtons firstButton={<ActionButtons.Button label="Create function" onClick={() => null} />} />
          }
          width="302px"
        >
          {exisitingFunctions.map((item, index) => (
            <MenuItem.WithButton
              label={item.label}
              onClick={() => setSelectedFunction(exisitingFunctions[index])}
              suffixButton={{ iconName: 'EditS', onClick: () => null }}
              key={index}
            />
          ))}
        </Menu>
      )}
    </Dropdown>
  );
};
