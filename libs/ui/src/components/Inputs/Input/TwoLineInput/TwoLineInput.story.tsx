import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { useExternalState } from '@/hooks';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { TwoLineInput } from './TwoLineInput.component';
import type { ITwoLineInput } from './types';

type Story = StoryObj<typeof TwoLineInput>;

const lineOnePlaceholderFixture = 'Enter entity value';
const lineTwoPlaceholderFixture = 'Add synonyms, comma seperated';

const meta: Meta<typeof TwoLineInput> = {
  title: 'Inputs/TwoLineInput',
  component: TwoLineInput,
  args: {
    firstLineProps: {
      value: '',
    },
    secondLineProps: {
      value: '',
    },
  },
  render: (args) => {
    const [firstLine, setFirstLine] = useExternalState(args.firstLineProps.value);
    const [secondLine, setSecondLine] = useExternalState(args.secondLineProps.value);

    return (
      <div style={{ width: '50%' }}>
        <TwoLineInput
          {...args}
          firstLineProps={{ ...args.firstLineProps, value: firstLine, onValueChange: setFirstLine }}
          secondLineProps={{ ...args.secondLineProps, value: secondLine, onValueChange: setSecondLine }}
        />
      </div>
    );
  },
};

export const Base: Story = {
  args: {
    firstLineProps: {
      value: '',
      placeholder: lineOnePlaceholderFixture,
    },
    secondLineProps: {
      value: '',
      placeholder: lineTwoPlaceholderFixture,
    },
  },
};
export const HideSecondLineOnBlur: Story = {
  args: {
    firstLineProps: {
      value: '',
      placeholder: lineOnePlaceholderFixture,
    },
    secondLineProps: {
      value: '',
      placeholder: lineTwoPlaceholderFixture,
    },
    hideSecondLineOnBlur: true,
  },
};
export const AlwaysShowSecondLine: Story = {
  args: {
    firstLineProps: {
      value: '',
      placeholder: lineOnePlaceholderFixture,
    },
    secondLineProps: {
      value: '',
      placeholder: lineTwoPlaceholderFixture,
    },
    hideSecondLineOnBlur: false,
  },
};

export const WithEllipsis: Story = {
  args: {
    firstLineProps: {
      value: 'Some long long long text here ok. Some long long long text here ok. Some long long long text here ok.',
      ellipsis: true,
      placeholder: lineOnePlaceholderFixture,
    },
    secondLineProps: {
      value:
        'And here some long long long text here ok. Some long long long text here ok. Some long long long text here ok.',
      ellipsis: true,
      placeholder: lineTwoPlaceholderFixture,
    },
    hideSecondLineOnBlur: false,
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ITwoLineInput>
      componentName={TwoLineInput.name}
      Component={(props) => {
        const [firstLine, setFirstLine] = useState(props.firstLineProps.value);
        const [secondLine, setSecondLine] = useState(props.secondLineProps.value);

        return (
          <TwoLineInput
            {...props}
            firstLineProps={{ ...props.firstLineProps, value: firstLine, onValueChange: setFirstLine }}
            secondLineProps={{ ...props.secondLineProps, value: secondLine, onValueChange: setSecondLine }}
          />
        );
      }}
      combinations={{
        firstLineProps: [
          {
            value: '',
            placeholder: lineOnePlaceholderFixture,
          },
          {
            value: 'Entity Text Value',
            placeholder: lineOnePlaceholderFixture,
          },
          {
            value: 'Entity Text Value',
            placeholder: lineOnePlaceholderFixture,
            disabled: true,
          },
        ],
        secondLineProps: [
          {
            value: '',
            placeholder: lineTwoPlaceholderFixture,
          },
          {
            value: 'synonym, synonym, synonym ',
            placeholder: lineTwoPlaceholderFixture,
          },
          {
            value: 'error ',
            placeholder: lineTwoPlaceholderFixture,
            error: true,
          },
          {
            value: 'error ',
            placeholder: lineTwoPlaceholderFixture,
            disabled: true,
          },
        ],
        hideSecondLineOnBlur: [false, true],
      }}
      center={false}
    />
  ),
};

export default meta;
