import type { Meta, StoryObj } from '@storybook/react';

import { SlateEditor } from '@/components/Inputs';
import { InputFormControl } from '@/main';
import { CartesianProduct } from '@/storybook/CartesianProduct';
import { defaultColors } from '@/utils/colors/color.util';

import { FocusIndicatorContainer } from './FocusIndicatorContainer.component';
import type { IFocusIndicatorContainer } from './FocusIndicatorContainer.interface';

type Story = StoryObj<typeof FocusIndicatorContainer>;

const meta: Meta<typeof FocusIndicatorContainer> = {
  title: 'Other/FocusIndicator/Container',
  component: FocusIndicatorContainer,
};

export default meta;

const variablesMap = {
  id1: {
    id: 'id1',
    kind: 'variable',
    name: 'Variable 1',
    color: defaultColors.fern,
    variant: SlateEditor.VariableElementVariant.VARIABLE,
  },
  id2: {
    id: 'id2',
    kind: 'variable',
    name: 'Variable 2',
    color: defaultColors.copper,
    variant: SlateEditor.VariableElementVariant.VARIABLE,
  },
  id3: {
    id: 'id3',
    kind: 'variable',
    name: 'Variable 3',
    color: defaultColors.havelock,
    variant: SlateEditor.VariableElementVariant.VARIABLE,
  },
  id4: {
    id: 'id4',
    kind: 'variable',
    name: 'Variable 4',
    color: defaultColors.hibiscus,
    variant: SlateEditor.VariableElementVariant.VARIABLE,
  },
} as const;

const defaultValue = [
  {
    children: [
      { text: 'Utterance text value ' },
      {
        type: SlateEditor.ElementType.VARIABLE,
        children: [{ text: '' }],
        variableID: 'id1',
        variableVariant: SlateEditor.VariableElementVariant.VARIABLE,
      },
      { text: ' ' },
    ],
  },
];

const pluginsOptions = {
  [SlateEditor.PluginType.VARIABLE]: { variablesMap, creatable: true, createButtonLabel: 'Create variable' },
};

export const WithInput: Story = {
  render: () => (
    <FocusIndicatorContainer pl={24}>
      <InputFormControl>
        <SlateEditor.Component
          value={defaultValue}
          editor={SlateEditor.createEditor([SlateEditor.PluginType.VARIABLE])}
          pluginsOptions={pluginsOptions}
        />
      </InputFormControl>
    </FocusIndicatorContainer>
  ),
};

export const WithInputFocused: Story = {
  render: () => (
    <FocusIndicatorContainer pl={24} isVisible>
      <InputFormControl>
        <SlateEditor.Component
          value={defaultValue}
          editor={SlateEditor.createEditor([SlateEditor.PluginType.VARIABLE])}
          pluginsOptions={pluginsOptions}
        />
      </InputFormControl>
    </FocusIndicatorContainer>
  ),
};

export const WithInputError: Story = {
  render: () => (
    <FocusIndicatorContainer pl={24} isVisible error>
      <InputFormControl errorMessage="This utterance is already used in the ‘intent name’ intent.">
        <SlateEditor.Component
          value={defaultValue}
          editor={SlateEditor.createEditor([SlateEditor.PluginType.VARIABLE])}
          pluginsOptions={pluginsOptions}
        />
      </InputFormControl>
    </FocusIndicatorContainer>
  ),
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IFocusIndicatorContainer>
      componentName={FocusIndicatorContainer.name}
      Component={(props) => (
        <FocusIndicatorContainer pl={24} {...props}>
          <InputFormControl
            errorMessage={props.error ? 'This utterance is already used in the ‘intent name’ intent.' : undefined}
          >
            <SlateEditor.Component
              value={defaultValue}
              editor={SlateEditor.createEditor([SlateEditor.PluginType.VARIABLE])}
              pluginsOptions={pluginsOptions}
            />
          </InputFormControl>
        </FocusIndicatorContainer>
      )}
      combinations={{
        error: [false, true],
        isVisible: [false, true],
      }}
      columns={3}
      center
    />
  ),
};
