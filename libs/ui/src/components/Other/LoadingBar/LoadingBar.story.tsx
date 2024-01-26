import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import type { ILoadingBar } from '@/components/Other/LoadingBar';
import { LoadingBar } from '@/components/Other/LoadingBar';
import { Box } from '@/components/Utility/Box';
import { CartesianProduct } from '@/storybook/CartesianProduct';

type Story = StoryObj<typeof LoadingBar>;

const meta: Meta<typeof LoadingBar> = {
  title: 'Other / Loading Bar',
  component: LoadingBar,
};

export const Base: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      if (progress === 100) return undefined;

      const timer = setTimeout(() => setProgress(progress + 50), 4000);
      return () => clearTimeout(timer);
    }, [progress]);

    return (
      <Box width="124px">
        <LoadingBar progress={progress} />
      </Box>
    );
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ILoadingBar>
      componentName={LoadingBar.name}
      Component={(props) => {
        const [progress, setProgress] = useState(0);

        useEffect(() => {
          if (progress === 100) return undefined;

          const timer = setTimeout(() => setProgress(progress + 50), 4000);
          return () => clearTimeout(timer);
        }, [progress]);

        return (
          <Box width="124px">
            <LoadingBar {...props} progress={progress} />
          </Box>
        );
      }}
      combinations={{
        progress: [0, 50, 100],
      }}
      center
    />
  ),
};

export default meta;
