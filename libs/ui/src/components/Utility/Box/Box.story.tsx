import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';
import { GroupTitle } from '@/storybook/GroupTitle';
import { Tokens } from '@/styles';

import { Box } from './Box.component';
import type { IBox } from './types';

type Story = StoryObj<typeof Box>;

const Item: React.FC<IBox> = ({ style, ...props }) => (
  <Box
    justify="center"
    align="center"
    style={{
      height: 50,
      width: 50,
      backgroundColor: Tokens.colors.fern.fern400,
      ...style,
    }}
    {...props}
  />
);

const meta: Meta<typeof Box> = {
  title: 'Utility/Box',
  component: Box,
  args: {
    children: [1, 2, 3].map((item, index) => <Item key={index}>{item}</Item>),
  },
};

export default meta;

export const Base: Story = {
  args: {
    justify: 'space-around',
  },
};

export const Examples: Story = {
  render: (args) => (
    <>
      <GroupTitle group="justify" />
      <CartesianProduct<IBox>
        Component={(props) => <Box {...args} {...props} style={{ width: '100%' }} />}
        combinations={{
          justify: ['space-around', 'space-between', 'center', 'start', 'end'],
        }}
      />
      <GroupTitle group="align" />
      <CartesianProduct<IBox>
        Component={(props) => <Box {...args} {...props} style={{ width: '100%', height: 100 }} />}
        combinations={{
          justify: ['center'],
          align: ['start', 'center', 'end'],
        }}
        columns={3}
      />
      <GroupTitle group="direction" />
      <CartesianProduct<IBox>
        Component={(props) => <Box {...args} {...props} />}
        combinations={{
          direction: ['row', 'column'],
        }}
        columns={2}
        center
      />
      <GroupTitle group="wrap" />
      <CartesianProduct<IBox>
        Component={(props) => (
          <Box {...args} {...props} style={{ width: '100%' }}>
            {[1, 2, 3].map((item, index) => (
              <Item style={{ width: '40%' }} key={index}>
                {item}
              </Item>
            ))}
          </Box>
        )}
        combinations={{
          wrap: ['wrap', 'nowrap', 'wrap-reverse'],
        }}
        columns={3}
      />
    </>
  ),
};
