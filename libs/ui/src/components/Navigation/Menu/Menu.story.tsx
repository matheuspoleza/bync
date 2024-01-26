import type { Meta, StoryObj } from '@storybook/react';
import type { IconName } from '@bync/icons';

import { Checkbox } from '@/components/Form/CheckboxControl/Checkbox';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { HotKeys } from '../../Other/HotKeys';
import { ActionButtons } from './ActionButtons';
import { Menu } from './Menu.component';
import { MenuDivider } from './MenuDivider';
import type { IMenuItem } from './MenuItem';
import { MenuItem } from './MenuItem';
import { Search } from './Search';
import type { IMenu } from './types';

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

const ITEM_FIXTURES: IMenuItem[] = [
  { label: 'Test' },
  { label: 'Best' },
  { label: 'Rest' },
  { label: 'Quest' },
  { label: 'Crest' },
  { label: 'Nest' },
  { label: 'Pest' },
  { label: 'Vest' },
  { label: 'West' },
  { label: 'Yeast' },
  { label: 'Feast' },
  { label: 'Least' },
  { label: 'Zest' },
  { label: 'Zorro' },
];

const MenuItemFixture: React.ReactElement<IMenuItem>[] = ITEM_FIXTURES.map((item) => (
  <MenuItem key={String(item.label)} {...item} />
));

export const With4Items: Story = {
  args: {
    children: MenuItemFixture.slice(0, 4),
  },
};

export const With8Items: Story = {
  args: {
    children: MenuItemFixture.slice(0, 8),
  },
};
export const With12Items: Story = {
  args: {
    children: MenuItemFixture,
  },
};

export const DividerVariations: Story = {
  render: () => (
    <CartesianProduct<IMenu>
      componentName={Menu.name}
      Component={(props) => <Menu {...props} />}
      combinations={{
        children: [
          [
            <MenuItem key="1" label="Howdy" />,
            <MenuDivider key="2" />,
            <MenuItem key="3" label="Howdy" />,
            <MenuItem key="4" label="Howdy" />,
            <MenuItem key="5" label="Howdy" />,
          ],
          [
            <MenuDivider label="Users" key="0" fullWidth={false} />,
            <MenuItem key="1" label="Howdy" />,
            <MenuItem key="2" label="Howdy" />,
            <MenuDivider label="Platforms" key="2" fullWidth={false} />,
            <MenuItem key="3" label="Howdy" />,
            <MenuItem key="4" label="Howdy" />,
            <MenuItem key="5" label="Howdy" />,
            <MenuDivider label="Agents" key="2" fullWidth={false} />,
            <MenuItem key="6" label="Howdy" />,
            <MenuItem key="7" label="Howdy" />,
            <MenuItem key="8" label="Howdy" />,
          ],
        ],
      }}
      columns={3}
    />
  ),
};

export const WithSearch: Story = {
  render: () => {
    const menuItems = (
      <>
        {ITEM_FIXTURES.map((item, index) => (
          <MenuItem key={index} {...item} searchValue="" />
        ))}
      </>
    );

    return (
      <div style={{ width: '300px' }}>
        <Menu
          searchSection={
            <Search
              onValueChange={() => null}
              placeholder="Placeholder"
              value=""
              key={1}
              suffixIconName="Plus"
              onSuffixIconClick={() => null}
            />
          }
        >
          {menuItems}
        </Menu>
      </div>
    );
  },
};

export const CreateStoryMenu: Story = {
  args: {
    children: [
      <MenuItem
        key="1"
        label="Create from scratch"
        caption="Create stories from scratch by manually defining content."
      />,
      <MenuItem key="2" label="Generate story" caption="Create stories from knowledge base data and prompts." />,
      <MenuItem key="3" label="Community" caption="Search and fork stories created by the community." />,
    ],
  },
};

export const BottomActionButtons: Story = {
  args: {
    children: [
      <MenuItem
        key="1"
        label="Create from scratch"
        caption="Create stories from scratch by manually defining content."
      />,
      <MenuItem key="2" label="Generate story" caption="Create stories from knowledge base data and prompts." />,
      <MenuItem key="3" label="Community" caption="Search and fork stories created by the community." />,
    ],
    actionButtons: (
      <ActionButtons
        firstButton={<ActionButtons.Button label="First" onClick={() => null} />}
        secondButton={<ActionButtons.Button label="Second" onClick={() => null} />}
      />
    ),
  },
};

export const PlatformMenu: Story = {
  args: {
    children: [
      <MenuDivider label="CX Platforms" key={0} fullWidth={false} />,
      <MenuItem key="1" label="Zendesk Help Center" prefixIconName="Zendesk" />,
      <MenuItem key="2" label="Intercom Help Center" prefixIconName="Intercom" />,
      <MenuDivider label="Agent Platforms" key={3} fullWidth={false} />,
      <MenuItem key="4" label="Dialogflow CX" prefixIconName="DialogflowCx" />,
      <MenuItem key="5" label="Dialogflow CX" prefixIconName="DialogflowEs" />,
      <MenuItem key="6" label="IBM Watson" prefixIconName="IbmWatson" />,
      <MenuItem key="7" label="Amazon Lex" prefixIconName="AmazonLex" />,
      <MenuItem key="8" label="Rasa" prefixIconName="Rasa" />,
      <MenuItem key="9" label="Nuance Mix" prefixIconName="NuanceMix" />,
    ],
  },
};
export const WithComplexMenuItem: Story = {
  args: {
    children: [
      <MenuItem
        key="1"
        label="Howdy"
        caption="Folks"
        prefixIconName="BuiltIn"
        checkbox={<Checkbox onChange={() => null} id="checkbox" value={false} />}
        suffixIconName="ArrowRightL"
      />,
      <MenuItem
        key="1"
        label="Disabled"
        disabled={true}
        caption="Folks"
        prefixIconName="BuiltIn"
        checkbox={<Checkbox onChange={() => null} id="checkbox" value={false} />}
        suffixIconName="ArrowRightL"
      />,
      <MenuItem
        key="2"
        label="Folks"
        prefixIconName="BuiltIn"
        checkbox={<Checkbox onChange={() => null} id="checkbox" value={false} />}
        suffixIconName="ArrowRightL"
      />,
      <MenuItem key="2" label="Folks" prefixIconName="BuiltIn" suffixIconName="ArrowRightL" />,
      <MenuItem key="2" label="Folks" checkbox={<Checkbox onChange={() => null} id="checkbox" value={false} />} />,
      <MenuItem key="2" label="Folks" prefixIconName="BuiltIn" />,
      <MenuItem
        key="2"
        label="Folks"
        caption="Howdy"
        hotKeys={
          <HotKeys
            hotKeys={[{ iconName: 'Command' }, { iconName: 'Shift' }, { iconName: 'Command' }, { label: '123' }]}
          />
        }
      />,
      <MenuItem
        key="2"
        label="Folks"
        hotKeys={<HotKeys hotKeys={[{ iconName: 'Command' }, { iconName: 'Shift' }, { label: 'C' }]} />}
      />,
    ],
  },
};

export const UserSaysMenu: Story = {
  args: {
    width: 123,
    children: [
      <MenuItem key="1" label="Listen" prefixIconName="Listen" />,
      <MenuItem key="2" label="Buttons" prefixIconName="Buttons" />,
      <MenuItem key="3" label="Choice" prefixIconName="Choice" />,
      <MenuItem key="4" label="Capture" prefixIconName="Capture" />,
      <MenuItem key="5" label="Upload" prefixIconName="Upload" />,
    ],
  },
};

const MOCK_AI_MODELS: { label: string; iconName: IconName; suffixText: string; disabled?: boolean }[] = [
  { label: 'GPT-3.5 Turbo (ChatGPT)', iconName: 'OpenAi', suffixText: '1x tokens' },
  { label: 'GPT-4', iconName: 'OpenAi', suffixText: '1x tokens' },
  { label: 'GPT-4 Turbo', iconName: 'OpenAi', suffixText: '25x tokens', disabled: true },
  { label: 'Claude Instant 1.2', iconName: 'Anthropic', suffixText: '1x tokens' },
  { label: 'Claude Instant 1', iconName: 'Anthropic', suffixText: '10x tokens' },
  { label: 'Claude Instant 2', iconName: 'Anthropic', suffixText: '10x tokens', disabled: true },
];
const LLMItems = MOCK_AI_MODELS.map(({ label, iconName, suffixText, disabled = false }) => {
  return (
    <MenuItem
      key={label}
      label={label}
      prefixIconName={iconName}
      disabled={disabled}
      hotKeys={<HotKeys hotKeys={[{ label: suffixText }]} />}
    />
  );
});

export const LLMModels: Story = {
  args: {
    minWidth: 311,
    children: LLMItems,
  },
};
