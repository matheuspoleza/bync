import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { useExternalState } from '@/hooks';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import type { ITab } from './Tab/types';
import { TabGroup } from './TabGroup.component';
import type { ITabGroup } from './types';

const withTextFixture = [
  {
    label: 'Tab 1',
  },
  {
    label: 'Tab 2',
  },
  {
    label: 'Tab 3',
  },
];

const withCounterFixture = [
  {
    label: 'Tabsdfsdfs 1',
    counter: 1,
  },
  {
    label: 'Tab 2',
    counter: 2,
  },
  {
    label: 'Tab 3',
    counter: 2,
  },
  {
    label: 'Tab 4',
    counter: 3,
  },
];

const iconTabFixtures = [
  {
    iconName: 'Amazon',
  },
  {
    iconName: 'Slack',
  },
  {
    iconName: 'Messenger',
  },
  {
    iconName: 'Twilio',
  },
] as ITab[];

type Story = StoryObj<typeof TabGroup>;

const meta: Meta<typeof TabGroup> = {
  title: 'Navigation/Tab Group',
  component: TabGroup,
  render: (args) => {
    const [tab, setTab] = useExternalState(0);

    return <TabGroup {...args} activeTab={tab} onChange={setTab} />;
  },
  parameters: {
    // wait for the animation to finish before taking a screenshot
    chromatic: { delay: 200 },
  },
};

export default meta;

export const FirstElementSelected = (args: ITabGroup) => {
  const [activeTab, setActiveTab] = useState(0);
  return <TabGroup {...args} tabs={withTextFixture} activeTab={activeTab} onChange={setActiveTab} />;
};
export const WithText = (args: ITabGroup) => {
  const [activeTab, setActiveTab] = useState(0);
  return <TabGroup {...args} tabs={withTextFixture} activeTab={activeTab} onChange={setActiveTab} />;
};

export const WithCounter: Story = {
  args: {
    tabs: withCounterFixture,
    hasDividers: true,
  },
};

export const WithIcons: Story = {
  args: {
    tabs: iconTabFixtures,
    hasDividers: true,
  },
};

export const WithAddButton: Story = {
  args: {
    tabs: [{ label: 'All Interfaces' }],
    hasAddButton: true,
    hasDividers: true,
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ITabGroup>
      componentName={TabGroup.name}
      Component={(props) => {
        const [tab, setTab] = useState(0);

        return <TabGroup {...props} activeTab={tab} onChange={setTab} />;
      }}
      combinations={{
        tabs: [withTextFixture, withCounterFixture, iconTabFixtures],
        hasDividers: [false, true],
        size: ['default', 'large'],
        hasAddButton: [false, true],
        width: ['hug', 'fill'],
      }}
    />
  ),
};
