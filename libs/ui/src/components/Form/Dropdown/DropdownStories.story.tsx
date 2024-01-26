import type { Meta, StoryObj } from '@storybook/react';
import type { IconName } from '@bync/icons';
import { useState } from 'react';

import { Menu, MenuItem } from '@/components/Navigation/Menu';
import { Box } from '@/components/Utility/Box/Box.component';
import type { ISquareButton } from '@/main';
import { CartesianProduct } from '@/storybook/CartesianProduct';
import { GroupTitle } from '@/storybook/GroupTitle';

import { Dropdown } from './Dropdown.component';
import type { IDropdown } from './Dropdown.interface';

const meta: Meta<typeof Dropdown> = {
  title: 'Form/Dropdown',
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const DropdownComponent = (props: Omit<IDropdown, 'children'>) => (
  <Dropdown {...props}>
    {({ referenceRef }) => (
      <Menu width={`max(100%, ${referenceRef.current?.clientWidth ?? 0}px)`}>
        <MenuItem label="Item 1" />
        <MenuItem label="Item 2" />
        <MenuItem label="Item 3" />
        <MenuItem label="Item 4" />
        <MenuItem label="Item 5" />
        <MenuItem label="Item 6" />
        <MenuItem label="Item 7" />
        <MenuItem label="Item 8" />
        <MenuItem label="Item 9" />
        <MenuItem label="Item 10" />
        <MenuItem label="Item 11" />
      </Menu>
    )}
  </Dropdown>
);

interface IMockItem {
  label: string;
  prefixIconName?: IconName;
  suffixButton?: ISquareButton;
}

const data: IMockItem[] = [
  { label: 'Standard' },
  { prefixIconName: 'Buttons', label: 'With Icon' },
  { prefixIconName: 'Text', label: 'Really Long Menu Item that needs to wrap' },
  { label: 'Item 3' },
  { label: 'Provided by Core', suffixButton: { iconName: 'EditS', onClick: () => null } },
  {
    prefixIconName: 'Number',
    suffixButton: { iconName: 'EditS', onClick: () => null },
    label: 'With Button and a long long label',
  },
  { prefixIconName: 'Number', label: 'No button but same component' },
];
const EllipsisDropdownComponent = (props: Omit<IDropdown, 'children'>) => {
  const [item, setItem] = useState<IMockItem | undefined>(undefined);
  return (
    <Box width={props.width}>
      <Dropdown width={props.width} value={item?.label || ''}>
        {({ referenceRef }) => (
          <Menu width={referenceRef.current?.clientWidth}>
            {data.map((item, index) => {
              if (item.suffixButton) {
                return <MenuItem.WithButton onClick={() => setItem(item)} key={index} {...item} />;
              }

              return (
                <MenuItem
                  key={index}
                  onClick={() => setItem(item)}
                  prefixIconName={item.prefixIconName}
                  label={item.label}
                />
              );
            })}
          </Menu>
        )}
      </Dropdown>
    </Box>
  );
};

export const Primary: Story = {
  render: () => (
    <>
      <GroupTitle group="variant" value="primary" />
      <CartesianProduct<IDropdown>
        componentName={Dropdown.name}
        Component={(props) => <DropdownComponent {...props} />}
        combinations={{
          value: [null, 'Howdy'],
          placeholder: ['Placeholder'],
          prefixIconName: [undefined, 'BuiltIn'],
          onPrefixIconClick: [() => null],
          error: [false, true],
          disabled: [false, true],
        }}
        center={true}
        isHidden={({ disabled, error }) => (disabled && error) || false}
        columns={2}
      />
    </>
  ),
};

export const Ellipsis: Story = {
  render: () => (
    <>
      <GroupTitle group="variant" value="primary" />
      <CartesianProduct<IDropdown>
        componentName={Dropdown.name}
        Component={(props) => <EllipsisDropdownComponent {...props} />}
        combinations={{
          width: ['200px', '144px', '400px'],
        }}
        center={true}
        isHidden={({ disabled, error }) => (disabled && error) || false}
        columns={2}
      />
    </>
  ),
};

export const WithFixedWidth: Story = {
  render: () => (
    <>
      <GroupTitle group="variant" value="primary" />
      <CartesianProduct<IDropdown>
        componentName={Dropdown.name}
        Component={(props) => <DropdownComponent {...props} />}
        combinations={{
          value: ['Howdy'],
          placeholder: ['Placeholder'],
          prefixIconName: [undefined, 'BuiltIn'],
          width: ['200px', '144px'],
          error: [false, true],
          disabled: [false, true],
        }}
        center={true}
        isHidden={({ disabled, error }) => (disabled && error) || false}
        columns={2}
      />
    </>
  ),
};

export const PrimarySmall: Story = {
  render: () => (
    <>
      <GroupTitle group="variant" value="primary/small" />
      <CartesianProduct<IDropdown>
        componentName={Dropdown.name}
        Component={(props) => <DropdownComponent {...props} />}
        combinations={{
          value: [null, 'Howdy'],
          placeholder: ['Placeholder'],
          isSmall: [true],
          error: [false, true],
          disabled: [false, true],
        }}
        isHidden={({ disabled, error }) => (disabled && error) || false}
        columns={2}
        center={true}
      />
    </>
  ),
};

export const PrimaryBorderless: Story = {
  render: () => (
    <>
      <GroupTitle group="variant" value="primary/borderless" />
      <CartesianProduct<IDropdown>
        componentName={Dropdown.name}
        Component={(props) => <DropdownComponent {...props} />}
        combinations={{
          value: [null, 'Howdy'],
          placeholder: ['Placeholder'],
          error: [false, true],
          isSmall: [true],
          bordered: [false],
          fontSize: ['caption', 'basic'],
          weight: ['regular', 'semiBold'],
          disabled: [false, true],
        }}
        isHidden={({ disabled, error }) => (disabled && error) || false}
        columns={2}
        center={true}
      />
    </>
  ),
};

export const Dark: Story = {
  render: () => (
    <>
      <GroupTitle group="variant" value="dark" />
      <CartesianProduct<IDropdown>
        componentName={Dropdown.name}
        isDark={() => true}
        Component={(props) => <DropdownComponent variant="dark" isSmall={true} {...props} />}
        combinations={{
          value: [null, 'Howdy'],
          placeholder: ['Placeholder'],
          fontSize: ['caption'],
          weight: ['regular', 'semiBold'],
          bordered: [false, true],
          disabled: [false, true],
        }}
        isHidden={({ disabled, error, weight, bordered }) =>
          (disabled && error) || (weight === 'regular' && bordered) || false
        }
        columns={2}
        center={true}
      />
    </>
  ),
};
