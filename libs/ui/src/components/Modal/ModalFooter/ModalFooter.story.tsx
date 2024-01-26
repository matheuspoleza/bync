import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { ModalFooterButton } from './components/ModalFooterButton';
import { ModalFooterCheckbox } from './components/ModalFooterCheckbox';
import type { IModalFooter } from './ModalFooter.component';
import { ModalFooter } from './ModalFooter.component';

type Story = StoryObj<typeof ModalFooter>;

const meta: Meta<typeof ModalFooter> = {
  title: 'Modal/Footer',
  component: ModalFooter,
};

const ExampleCheckbox = () => {
  const [value, setValue] = useState(false);

  return <ModalFooterCheckbox label="Label" id="checkbox-0" value={value} onValueChange={setValue} />;
};

export const Base: Story = {
  args: {
    children: (
      <>
        <ModalFooterButton label="Agree" onClick={() => null} variant="secondary" />
        <ModalFooterButton label="Agree" onClick={() => null} variant="primary" />
      </>
    ),
  },
};

export const WithCheckBox: Story = {
  args: {
    checkbox: <ExampleCheckbox />,
  },
};

export const Alert: Story = {
  args: {
    children: (
      <>
        <ModalFooterButton label="Close" onClick={() => null} variant="secondary" />
        <ModalFooterButton label="Delete flow" onClick={() => null} variant="alert" />
      </>
    ),
  },
};

export const WithIconButton: Story = {
  args: {
    children: (
      <>
        <ModalFooterButton label="Close" onClick={() => null} variant="secondary" />
        <ModalFooterButton iconName="Generate" label="Create stories" onClick={() => null} variant="primary" />
      </>
    ),
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IModalFooter>
      center
      groupBy="checkbox"
      componentName={ModalFooter.name}
      Component={ModalFooter}
      combinations={{
        children: [
          <>
            <ModalFooterButton label="Close" onClick={() => null} variant="secondary" />
            <ModalFooterButton label="Agree" onClick={() => null} variant="primary" />
          </>,
          <>
            <ModalFooterButton label="Close" onClick={() => null} variant="secondary" />
            <ModalFooterButton label="Delete flow" onClick={() => null} variant="alert" />
          </>,
          <>
            <ModalFooterButton label="Close" onClick={() => null} variant="secondary" />
            <ModalFooterButton iconName="Generate" label="Create stories" onClick={() => null} variant="primary" />
          </>,
          // eslint-disable-next-line react/jsx-key
          <ModalFooterButton label="Agree" onClick={() => null} variant="primary" />,
        ],
        // eslint-disable-next-line react/jsx-key
        checkbox: [undefined, <ExampleCheckbox />],
      }}
    />
  ),
};

export default meta;
