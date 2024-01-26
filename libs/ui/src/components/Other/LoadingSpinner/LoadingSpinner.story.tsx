import type { Meta, StoryObj } from '@storybook/react';

import { LoadingSpinner } from '@/components/Other/LoadingSpinner';
import { Box } from '@/components/Utility';
import { CartesianProduct } from '@/storybook/CartesianProduct';
import { Tokens } from '@/styles';

import type { ILoadingSpinner } from './LoadingSpinner.component';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Other/Loading Spinner',
  component: LoadingSpinner,
};

export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const ExampleBox = (props: ILoadingSpinner & { isDark?: boolean }) => (
  <Box
    style={{
      backgroundColor: props.isDark ? Tokens.colors.accent.accent500 : Tokens.colors.white[100],
      border: props.isDark ? 'none' : `1px solid ${Tokens.colors.black[6]}`,
    }}
    width="300px"
    height="200px"
    justify="center"
    align="center"
  >
    <LoadingSpinner {...props} />
  </Box>
);

export const Base: Story = {
  render: (args) => <ExampleBox {...args} />,
};

export const Large: Story = {
  args: {
    size: 'large',
  },
  render: (args) => <ExampleBox {...args} />,
};

export const Dark: Story = {
  args: {
    variant: 'dark',
  },
  render: (args) => <ExampleBox {...args} />,
};

export const LargeDark: Story = {
  args: {
    size: 'large',
    variant: 'dark',
  },
  render: (args) => <ExampleBox {...args} />,
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ILoadingSpinner>
      componentName={LoadingSpinner.name}
      Component={(props) => <ExampleBox {...props} isDark={props.variant !== 'dark'} />}
      combinations={{
        size: ['medium', 'large'],
        variant: ['light', 'dark'],
      }}
      columns={2}
      center
    />
  ),
};
