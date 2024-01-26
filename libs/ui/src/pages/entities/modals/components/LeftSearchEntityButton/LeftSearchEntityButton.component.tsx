import { useMemo, useState } from 'react';

import { SquareButton } from '@/components/Buttons/SquareButton';
import { Menu } from '@/components/Navigation/Menu';
import { Box } from '@/components/Utility/Box';
import { Popper } from '@/components/Utility/Popper';

const ENTITY_LIST_MOCK = [
  'Address',
  'Contact',
  'Order',
  'Phone number',
  'Time',
  'Address',
  'Contact',
  'Order',
  'Phone number',
  'Time',
];

export const LeftSearchEntityButton = () => {
  const [searchValue, setSearchValue] = useState('');

  const onSearch = (value: string) => {
    setSearchValue(value);
  };

  const items = useMemo(
    () => ENTITY_LIST_MOCK.filter((item) => item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())),
    [searchValue]
  );

  return (
    <Popper
      placement="left-start"
      referenceElement={({ isOpen, onToggle, ref }) => (
        <Box mr={8}>
          <SquareButton onClick={onToggle} ref={ref} size="medium" iconName="Menu" isActive={isOpen} />
        </Box>
      )}
    >
      {() => (
        <Menu searchSection={<Menu.Search value={searchValue} placeholder="Search" onValueChange={onSearch} />}>
          {items.length ? (
            items.map((item) => (
              <Menu.Item key={item} label={item} searchValue={searchValue} onClick={() => setSearchValue('')} />
            ))
          ) : (
            <Menu.CreateItem label={searchValue} />
          )}
        </Menu>
      )}
    </Popper>
  );
};
