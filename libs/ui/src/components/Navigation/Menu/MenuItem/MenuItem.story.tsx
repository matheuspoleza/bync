import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '@/components/Form/CheckboxControl/Checkbox';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { HotKeys } from '../../../Other/HotKeys';
import { MenuItem } from './MenuItem.component';
import type { IMenuItem } from './types';

const meta: Meta<typeof MenuItem> = {
  title: 'Navigation/Menu/MenuItem',
  component: MenuItem,
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Label: Story = {
  args: {
    label: 'Label',
  },
};

export const LongLabel: Story = {
  args: {
    label: 'Very Long Lengthy Verbose Label',
  },
};

export const DisabledMode: Story = {
  args: {
    prefixIconName: 'Community',
    label: 'Very Long Lengthy Disabled Verbose Label',
    disabled: true,
  },
};

export const PrefixIcon: Story = {
  args: {
    label: 'Label',
    prefixIconName: 'Community',
  },
};

export const IsHovering: Story = {
  args: {
    label: 'Label',
    prefixIconName: 'Community',
    isHovering: true,
  },
};

export const SuffixIcon: Story = {
  args: {
    label: 'Label',
    suffixIconName: 'Community',
  },
};

export const DuplicateIcon: Story = {
  args: {
    label: 'Label',
    suffixIconName: 'Duplicate',
  },
};

export const LabelCaption: Story = {
  args: {
    label: 'Label',
    caption: 'Caption',
  },
};
export const LabelSuffixIcon: Story = {
  args: {
    label: 'Label',
    suffixIconName: 'Community',
  },
};

export const HotKeysStory: Story = {
  args: {
    label: 'Label',
    hotKeys: (
      <HotKeys hotKeys={[{ iconName: 'Command' }, { iconName: 'Shift' }, { iconName: 'Command' }, { label: '123' }]} />
    ),
  },
};

export const Everything: Story = {
  args: {
    label: 'Label',
    caption: 'Caption',
    prefixIconName: 'BuiltIn',
    checkbox: <Checkbox id="checkbox" value={true} onChange={() => null} />,
    suffixIconName: 'ArrowRightL',
  },
};

export const Base: Story = {
  render: () => (
    <CartesianProduct<IMenuItem>
      componentName={MenuItem.name}
      Component={(props) => <MenuItem {...props} onClick={() => null} />}
      combinations={{
        label: ['Label', 'Very Long Lengthy Verbose Label'],
        suffixIconName: [undefined, 'ArrowRightL'],
        isHovering: [undefined, true],
        prefixIconName: [undefined, 'BuiltIn'],
      }}
      columns={1}
    />
  ),
};
export const Addons: Story = {
  render: () => (
    <CartesianProduct<IMenuItem>
      componentName={MenuItem.name}
      Component={(props) => (
        <MenuItem
          {...props}
          onClick={() => null}
          checkbox={
            props.checkbox ? (
              <Checkbox key={0} id="checkbox" value={true} disabled={props.disabled} onChange={() => null} />
            ) : undefined
          }
        />
      )}
      combinations={{
        label: ['Label'],
        prefixIconName: ['BuiltIn'],
        disabled: [false, true],
        checkbox: [undefined, <Checkbox key={0} id="checkbox" value={true} onChange={() => null} />],
        caption: [undefined, 'Caption'],
        hotKeys: [undefined, <HotKeys key={1} hotKeys={[{ iconName: 'Command' }, { iconName: 'Shift' }]} />],
      }}
      columns={1}
    />
  ),
};
