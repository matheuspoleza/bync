import type { Meta, StoryObj } from '@storybook/react';

import { DataSourceEmptyView } from './DataSourceEmptyView.component';

type Story = StoryObj<typeof DataSourceEmptyView>;

const meta: Meta<typeof DataSourceEmptyView> = {
  title: 'Pages / KnowledgeBase / DataSource',
  component: DataSourceEmptyView,
};

export const Base: Story = {};

export const WithEmptyBanner = {};

export default meta;
