import type { Meta, StoryObj } from '@storybook/react';

import { Placeholder } from '@/components';

import { EmptyEventsPageContent } from './empty-view/EmptyViewContent.component';
import { EventPageLayout } from './EventPageLayout.component';

type Story = StoryObj<typeof EventPageLayout>;

const meta: Meta<typeof EventPageLayout> = {
  title: 'Pages/EventsPage ',
  component: EventPageLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Wrapper: Story = {
  args: {
    content: <Placeholder />,
  },
};

export const Empty: Story = {
  args: {
    content: <EmptyEventsPageContent />,
  },
};

export default meta;
