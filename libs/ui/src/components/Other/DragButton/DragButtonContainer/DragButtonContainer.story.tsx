import type { Meta, StoryObj } from '@storybook/react';

import { SlateEditor } from '@/components/Inputs';
import { InputFormControl } from '@/main';
import { CartesianProduct } from '@/storybook/CartesianProduct';
import { defaultColors } from '@/utils/colors/color.util';

import { FocusIndicator } from '../../FocusIndicator';
import { DragButtonContainer } from './DragButtonContainer.component';
import type { IDragButtonContainer } from './DragButtonContainer.interface';

type Story = StoryObj<typeof DragButtonContainer>;

const meta: Meta<typeof DragButtonContainer> = {
  title: 'Other/DragButton/Container',
  component: DragButtonContainer,
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
      { type: SlateEditor.ElementType.VARIABLE, variableID: 'id1', children: [{ text: '' }] },
      { text: ' ' },
    ],
  },
];

const pluginsOptions = {
  [SlateEditor.PluginType.VARIABLE]: { variablesMap, creatable: true, createButtonLabel: 'Create variable' },
};

export const WithInput: Story = {
  render: () => (
    <DragButtonContainer variant="inline">
      <FocusIndicator.Container pl={24}>
        <InputFormControl>
          <SlateEditor.Component
            value={defaultValue}
            editor={SlateEditor.createEditor([SlateEditor.PluginType.VARIABLE])}
            pluginsOptions={pluginsOptions}
          />
        </InputFormControl>
      </FocusIndicator.Container>
    </DragButtonContainer>
  ),
};

export const WithInputVisible: Story = {
  render: () => (
    <DragButtonContainer isVisible>
      <FocusIndicator.Container pl={24} isVisible>
        <InputFormControl>
          <SlateEditor.Component
            value={defaultValue}
            editor={SlateEditor.createEditor([SlateEditor.PluginType.VARIABLE])}
            pluginsOptions={pluginsOptions}
          />
        </InputFormControl>
      </FocusIndicator.Container>
    </DragButtonContainer>
  ),
};

export const WithInputVisibleActive: Story = {
  render: () => (
    <DragButtonContainer isVisible isActive>
      <FocusIndicator.Container pl={24} isVisible>
        <InputFormControl>
          <SlateEditor.Component
            value={defaultValue}
            editor={SlateEditor.createEditor([SlateEditor.PluginType.VARIABLE])}
            pluginsOptions={pluginsOptions}
          />
        </InputFormControl>
      </FocusIndicator.Container>
    </DragButtonContainer>
  ),
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IDragButtonContainer>
      componentName={DragButtonContainer.name}
      Component={(props) => (
        <DragButtonContainer {...props} variant="inline">
          <FocusIndicator.Container pl={24} isVisible={props.isVisible}>
            <InputFormControl>
              <SlateEditor.Component
                value={defaultValue}
                editor={SlateEditor.createEditor([SlateEditor.PluginType.VARIABLE])}
                pluginsOptions={pluginsOptions}
              />
            </InputFormControl>
          </FocusIndicator.Container>
        </DragButtonContainer>
      )}
      combinations={{
        isVisible: [false, true],
        isHovering: [false, true],
        isActive: [false, true],
      }}
      columns={3}
      center
    />
  ),
};
