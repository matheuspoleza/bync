import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { CartesianProduct } from '@/storybook/CartesianProduct';
import { WithFormControlState } from '@/storybook/decorators';
import { GroupTitle } from '@/storybook/GroupTitle';

import { TextField } from './TextField.component';
import type { ITextField } from './types';

type Story = StoryObj<typeof TextField>;

const meta: Meta<typeof TextField> = {
  title: 'Form/Text Field',
  component: TextField,
  args: {
    value: '',
  },
  decorators: [WithFormControlState],
};

export default meta;

const ControlledTextField = (props: ITextField) => {
  const [value, setValue] = useState(props.value);

  return <TextField {...props} value={value} onValueChange={setValue} />;
};

export const Base: Story = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    caption: 'Caption',
    errorMessage: 'Error message',
  },
  render: (args) => (
    <div style={{ width: '50%' }}>
      <ControlledTextField {...args} />
    </div>
  ),
};

export const PrimaryExamples: Story = {
  render: () => (
    <>
      <GroupTitle group="variant" value="primary" />
      <CartesianProduct<ITextField>
        componentName={TextField.name}
        Component={ControlledTextField}
        combinations={{
          variant: ['primary'],
          placeholder: ['Placeholder'],
          suffixIconOnClick: [() => null],
          value: ['', 'Hello'],
          error: [false, true],
          disabled: [false, true],
          prefixIconName: [undefined, 'Intent'],
          suffixIconName: [undefined, 'Copy'],
          label: ['Label'],
          caption: [undefined, 'Caption'],
          errorMessage: ['', 'Error'],
        }}
        isHidden={({ label, caption, errorMessage }) => !label && !caption && !errorMessage}
        columns={4}
      />
    </>
  ),
};

export const GhostExamples: Story = {
  render: () => (
    <>
      <GroupTitle group="variant" value="ghost" />
      <CartesianProduct<ITextField>
        componentName={TextField.name}
        Component={ControlledTextField}
        combinations={{
          variant: ['ghost'],
          placeholder: ['Placeholder'],
          suffixIconOnClick: [() => null],
          value: ['', 'Hello'],
          error: [false, true],
          disabled: [false, true],
          prefixIconName: [undefined, 'Intent'],
          label: ['', 'Label'],
          caption: [undefined, 'Caption'],
          errorMessage: ['', 'Error'],
        }}
        columns={4}
      />
    </>
  ),
};

export const DarkExamples: Story = {
  render: () => (
    <>
      <GroupTitle group="variant" value="dark" />
      <CartesianProduct<ITextField>
        componentName={TextField.name}
        Component={ControlledTextField}
        combinations={{
          variant: ['dark'],
          placeholder: ['Placeholder'],
          suffixIconOnClick: [() => null],
          value: ['', 'Hello'],
          error: [false, true],
          disabled: [false, true],
          prefixIconName: [undefined, 'Intent'],
          label: ['', 'Label'],
          caption: [undefined, 'Caption'],
          errorMessage: ['', 'Error'],
        }}
        columns={4}
        isDark={() => true}
      />
    </>
  ),
};
