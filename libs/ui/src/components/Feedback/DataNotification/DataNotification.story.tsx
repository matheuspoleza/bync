import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { DataNotification } from './DataNotification.component';
import type { IDataNotification } from './types';

type Story = StoryObj<typeof DataNotification>;

const meta: Meta<typeof DataNotification> = {
  title: 'Feedback/DataNotification',
  component: DataNotification,
};

const textFixture =
  'Sample phrases within the intent are sufficiently differentiated compared to the rest of the model.';

export const Clarity: Story = {
  args: {
    score: 85,
    text: textFixture,
    type: 'clarity',
    onButtonClick: () => console.log('click'),
  },
};

export const Confidence: Story = {
  args: {
    score: 20,
    text: textFixture,
    type: 'confidence',
    onButtonClick: () => console.log('click'),
  },
};

export const UsingLevel: Story = {
  args: {
    score: 20,
    text: textFixture,
    type: 'confidence',
    level: 'low',
    onButtonClick: () => console.log('click'),
  },
};

export const Examples: Story = {
  render: () => (
    <>
      <CartesianProduct<IDataNotification>
        componentName={DataNotification.name}
        Component={(props) => <DataNotification text={textFixture} {...props} />}
        combinations={{
          score: [85, 64, 25],
          onButtonClick: [undefined, () => console.log('click')],
        }}
        columns={3}
      />
    </>
  ),
};

export default meta;
