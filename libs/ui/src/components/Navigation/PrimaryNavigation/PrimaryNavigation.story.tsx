/* eslint-disable sonarjs/no-identical-functions */
import type { Meta, StoryObj } from '@storybook/react';
import type { IconName } from '@bync/icons';
import { useState } from 'react';

import { MenuItem } from '@/components/Navigation/Menu/MenuItem';

import { Menu } from '../Menu';
import type { IPrimaryNavigation } from '.';
import { PrimaryNavigation } from '.';

type Story = StoryObj<typeof PrimaryNavigation>;

const meta: Meta<typeof PrimaryNavigation> = {
  title: 'Navigation/Primary Navigation',
  component: PrimaryNavigation,
};

export const OnlyTopMenu = (args: IPrimaryNavigation) => {
  const [active, setActive] = useState('Designer');

  const itemProps = (iconName: IconName) => ({
    iconName,
    isActive: active === iconName,
    onClick: () => setActive(iconName),
  });

  return (
    <div style={{ width: 56, height: 400, display: 'flex' }}>
      <PrimaryNavigation {...args}>
        <PrimaryNavigation.Section>
          <PrimaryNavigation.Header menuProps={{ numberOfItemsToShow: 13 }}>
            <MenuItem label="Back" onClick={() => null} />
            <Menu.Divider />
            <MenuItem label="Action 1" onClick={() => null} />
            <MenuItem label="Action 2" onClick={() => null} />
            <MenuItem label="Action 3" onClick={() => null} />
            <Menu.Divider />
            <MenuItem label="Action 1" onClick={() => null} />
            <MenuItem label="Action 2" onClick={() => null} />
            <MenuItem label="Action 3" onClick={() => null} />
            <Menu.Divider />
            <MenuItem label="Action 1" onClick={() => null} />
            <MenuItem label="Action 2" onClick={() => null} />
            <MenuItem label="Action 3" onClick={() => null} />
          </PrimaryNavigation.Header>
          <PrimaryNavigation.Item {...itemProps('Designer')} />
          <PrimaryNavigation.Item {...itemProps('Api')} />
          <PrimaryNavigation.Item {...itemProps('Measure')} />
          <PrimaryNavigation.Item {...itemProps('Settings')} />
        </PrimaryNavigation.Section>
      </PrimaryNavigation>
    </div>
  );
};

export const Examples: Story = {
  render: () => {
    const [active, setActive] = useState('Designer');

    const itemProps = (iconName: IconName) => ({
      iconName,
      isActive: active === iconName,
      onClick: () => setActive(iconName),
    });

    return (
      <div style={{ width: 56, height: 400, display: 'flex' }}>
        <PrimaryNavigation>
          <PrimaryNavigation.Section>
            <PrimaryNavigation.Header>
              <MenuItem label="Logout" onClick={() => null} />
            </PrimaryNavigation.Header>
            <PrimaryNavigation.Item {...itemProps('Designer')} />
            <PrimaryNavigation.Item {...itemProps('Api')} />
            <PrimaryNavigation.Item {...itemProps('Measure')} />
            <PrimaryNavigation.Item {...itemProps('Settings')} />
          </PrimaryNavigation.Section>
          <PrimaryNavigation.Section>
            <PrimaryNavigation.Item {...itemProps('Info')} />
          </PrimaryNavigation.Section>
        </PrimaryNavigation>
      </div>
    );
  },
};

export default meta;
