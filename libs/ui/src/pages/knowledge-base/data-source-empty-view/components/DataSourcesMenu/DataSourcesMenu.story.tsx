import type { Meta, StoryObj } from '@storybook/react';

import { DataSourcesMenu } from './DataSourcesMenu.component';

type Story = StoryObj<typeof DataSourcesMenu>;

const meta: Meta<typeof DataSourcesMenu> = {
  title: 'Pages / KnowledgeBase / DataSourcesMenu',
  component: DataSourcesMenu,
};

export const Base: Story = {
  args: {},
};

export default meta;
