import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react';

import { CartesianProduct } from '@/storybook/CartesianProduct';
import { GroupTitle } from '@/storybook/GroupTitle';
import { Tokens } from '@/styles';

type Story = StoryObj<JSX.Element>;

const meta: Meta = {
  title: 'Tokens/Color',
};

export default meta;

export const Examples: Story = {
  render: () => (
    <>
      {Object.entries(Tokens.colors).map(([baseColor, shades], index) => (
        <Fragment key={index}>
          <GroupTitle group="color" value={baseColor} />
          <CartesianProduct<{ color: string; shade: keyof typeof shades }>
            Component={({ shade }) => (
              <div
                style={{
                  height: '150px',
                  width: '100%',
                  background: shades[shade],
                }}
              />
            )}
            combinations={{
              color: [baseColor],
              shade: Object.keys(shades) as keyof typeof shades,
            }}
            columns={2}
          />
        </Fragment>
      ))}
    </>
  ),
};
