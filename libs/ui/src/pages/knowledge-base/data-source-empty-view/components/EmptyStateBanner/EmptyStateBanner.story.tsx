import type { Meta, StoryObj } from '@storybook/react';
import { NoData } from '@bync/icons';

import { Link } from '@/components/Navigation/Link';

import { DataSourcesMenu } from '../DataSourcesMenu';
import { EmptyStateBanner } from './EmptyStateBanner.component';

type Story = StoryObj<typeof EmptyStateBanner>;

const meta: Meta<typeof EmptyStateBanner> = {
  title: 'Pages / KnowledgeBase / EmptyStateBanner',
  component: EmptyStateBanner,
};

export const Base: Story = {
  args: {
    title: 'No data sources exist',
    caption: 'Add data sources to your assistant to build a knowledge base of material.',
    icon: <NoData />,
    button: <DataSourcesMenu />,
    link: <Link inline label=" Learn more" href="" />,
  },
};

export default meta;
