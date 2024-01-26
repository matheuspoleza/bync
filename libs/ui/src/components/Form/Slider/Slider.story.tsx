import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { CartesianProduct } from '@/storybook/CartesianProduct';
import { WithFormControlState } from '@/storybook/decorators';

import type { ISlider } from './Slider.component';
import { Slider } from './Slider.component';

type Story = StoryObj<typeof Slider>;

const meta: Meta<typeof Slider> = {
  title: 'Form/Slider',
  component: Slider,
  args: { value: 0 },
};

export const Base: Story = {
  args: { max: 100 },
  decorators: [WithFormControlState],
  render: (args) => {
    return (
      <div style={{ width: 200 }}>
        <Slider {...args} startLabel="Slow" endLabel="Fast" />
      </div>
    );
  },
};

export const SmallValues: Story = {
  args: { max: 1 },
  decorators: [WithFormControlState],
  render: (args) => {
    return (
      <div style={{ width: 200 }}>
        <Slider {...args} startLabel="Slow" endLabel="Fast" shouldSnapToMark={false} marks={[0, 1]} />
      </div>
    );
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ISlider>
      componentName={Slider.displayName}
      Component={({ marks, ...props }) => {
        const defaultValue = Array.isArray(marks) ? marks[1] : Math.round(100 / (marks! - 1));
        const [value, setValue] = useState(defaultValue);

        return (
          <div style={{ width: 200 }}>
            <Slider {...props} value={value} onValueChange={setValue} marks={marks} />
          </div>
        );
      }}
      combinations={{
        marks: [2, 3, 5, 10, [10, 60, 100], [0, 10, 90, 100]],
        startLabel: ['Silent'],
        endLabel: ['Loud'],
      }}
      center
    />
  ),
};

export default meta;
