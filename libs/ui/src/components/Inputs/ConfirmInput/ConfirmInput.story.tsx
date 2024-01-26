import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IInput } from '@/components';
import { Input, SlateEditor } from '@/components';
import { CartesianProduct } from '@/storybook/CartesianProduct';
import { WithFormControlState } from '@/storybook/decorators';

import { createEditor } from '../SlateEditor';
import { ConfirmInput } from '.';
import type { IConfirmInput } from './ConfirmInput.interface';

type Story = StoryObj<typeof ConfirmInput>;

const ControlledInput: React.FC<Partial<IInput>> = (props) => {
  const [value, setValue] = useState(props.value ?? '');

  return <Input {...props} value={value} placeholder="Placeholder" onValueChange={setValue} />;
};

const meta: Meta<typeof ConfirmInput> = {
  title: 'Inputs/ConfirmInput',
  component: ConfirmInput,
  decorators: [WithFormControlState],
};

export default meta;

const placeholderText = 'Placeholder';
const labelText = 'Label';

export const BaseWithInput: Story = {
  render: () => {
    return (
      <ConfirmInput>
        {({ disabled, isLoading, inputFieldClassName }) => (
          <>
            <ControlledInput className={inputFieldClassName} disabled={disabled} placeholder={placeholderText} />
            <ConfirmInput.Button label={labelText} disabled={disabled} isLoading={isLoading} />
          </>
        )}
      </ConfirmInput>
    );
  },
};

export const BaseWithSlate: Story = {
  render: () => {
    return (
      <ConfirmInput>
        {({ disabled, isLoading, inputFieldClassName }) => (
          <>
            <SlateEditor.Component
              value={[{ children: [{ text: '' }] }]}
              editor={createEditor()}
              placeholder={placeholderText}
              className={inputFieldClassName}
              disabled={disabled}
            />
            <ConfirmInput.Button label={labelText} disabled={disabled} isLoading={isLoading} />
          </>
        )}
      </ConfirmInput>
    );
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IConfirmInput>
      componentName={ConfirmInput.name}
      Component={ConfirmInput}
      combinations={{
        isLoading: [true, false],
        children: [
          ({ disabled, isLoading, inputFieldClassName: inputFieldClass }) => (
            <>
              <ControlledInput
                value="This is an Input component"
                placeholder={placeholderText}
                disabled={disabled}
                className={inputFieldClass}
              />
              <ConfirmInput.Button label={labelText} disabled={disabled} isLoading={isLoading} />
            </>
          ),
          ({ disabled, isLoading, inputFieldClassName: inputFieldClass }) => (
            <>
              <SlateEditor.Component
                value={[{ children: [{ text: 'This is a Slate Editor component' }] }]}
                editor={createEditor()}
                placeholder={placeholderText}
                className={inputFieldClass}
                disabled={disabled}
              />
              <ConfirmInput.Button label={labelText} disabled={disabled} isLoading={isLoading} />
            </>
          ),
        ],
      }}
      columns={2}
    />
  ),
};
