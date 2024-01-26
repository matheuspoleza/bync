import type { Meta, StoryObj } from '@storybook/react';

import { Search } from './Search.component';

const meta: Meta<typeof Search> = {
  title: 'Navigation/Menu/Search',
  component: Search,
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Base: Story = {
  args: {
    suffixIconName: 'Plus',
    onSuffixIconClick: () => null,
  },
};
