import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/components/Buttons/Button/Button.component';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { Divider } from './Divider.component';
import type { IDivider } from './types';

const meta: Meta<typeof Divider> = {
  title: 'Other/Divider',
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IDivider>
      componentName={Divider.name}
      Component={(props) => <Divider {...props} />}
      combinations={{
        label: ['Label', ''],
        centeredLabel: [false, true],
        dashed: [false, true],
        onCloseClick: [undefined, () => null],
        breakDivider: [false, true],
        thick: [false, true],
        dark: [false, true],
      }}
    />
  ),
};

export const Solid: Story = {
  render: () => (
    <CartesianProduct<IDivider>
      componentName={Divider.name}
      Component={(props) => <Divider {...props} />}
      combinations={{
        label: ['Label', ''],
        centeredLabel: [false, true],
        dashed: [false],
      }}
      isHidden={({ centeredLabel, label }) => (centeredLabel && label === '') || false}
    />
  ),
};
export const Dashed: Story = {
  render: () => (
    <CartesianProduct<IDivider>
      componentName={Divider.name}
      Component={(props) => <Divider {...props} />}
      combinations={{
        label: [''],
        centeredLabel: [false],
        dashed: [true],
      }}
    />
  ),
};
export const Break: Story = {
  render: () => (
    <CartesianProduct<IDivider>
      componentName={Divider.name}
      Component={(props) => <Divider {...props} />}
      combinations={{
        label: ['Used in 3 blocks'],
        onCloseClick: [() => null],
        centeredLabel: [false],
        breakDivider: [true],
      }}
    />
  ),
};
export const Thick: Story = {
  render: () => (
    <CartesianProduct<IDivider>
      componentName={Divider.name}
      Component={(props) => <Divider {...props} />}
      combinations={{
        label: [''],
        thick: [true],
      }}
    />
  ),
};
export const Dark: Story = {
  render: () => (
    <CartesianProduct<IDivider>
      componentName={Divider.name}
      Component={(props) => <Divider {...props} />}
      combinations={{
        label: [''],
        dark: [true],
      }}
    />
  ),
};

const InteractiveDivider = () => {
  const defaultLabel = 'Reset # override';
  const [label, setLabel] = useState(defaultLabel);

  const handleClick = () => {
    setLabel((prev) => (prev === defaultLabel ? 'Settings' : defaultLabel));
  };

  return (
    <div>
      <Divider label={label} onLabelClick={label === defaultLabel ? handleClick : undefined} />
      {label === 'Settings' && <Button onClick={handleClick}>Change label</Button>}
    </div>
  );
};

export const WithLink: Story = {
  render: () => <InteractiveDivider />,
};
