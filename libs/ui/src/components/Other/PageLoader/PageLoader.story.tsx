import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Box } from '@/components/Utility';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { type IPageLoader, PageLoader } from './PageLoader.component';

const meta: Meta<typeof PageLoader> = {
  title: 'Other / Page Loader',
  component: PageLoader,
  parameters: {
    // wait for the animation to finish before taking a screenshot
    chromatic: { delay: 9000 },
  },
};

type Story = StoryObj<typeof PageLoader>;

export const Base: Story = {
  render: (args) => {
    const [progress, setProgress] = useState(4);

    useEffect(() => {
      if (progress >= 100) return () => null;

      const timer = setTimeout(() => setProgress(progress + 50), 4000);
      return () => clearTimeout(timer);
    }, [progress]);

    return (
      <Box width="100%" height="500px">
        <PageLoader {...args} progress={progress} />
      </Box>
    );
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IPageLoader>
      componentName={PageLoader.name}
      Component={(props) => {
        const [progress, setProgress] = useState(4);

        useEffect(() => {
          if (progress >= 100) return () => null;

          const timer = setTimeout(() => setProgress(progress + 50), 4000);
          return () => clearTimeout(timer);
        }, [progress]);

        return (
          <Box width="100%" height="500px">
            <PageLoader {...props} progress={progress} />
          </Box>
        );
      }}
      combinations={{
        progress: [0],
      }}
      center
    />
  ),
};

export default meta;
