import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

import { CartesianProduct } from '@/storybook/CartesianProduct';
import { linkLightTokens } from '@/styles/theme/components/link';
import { colorStringToRGBA } from '@/utils/color.util';

import { createEditor } from '../../editor/editor';
import * as SlateEditor from '../../index';
import { PluginType, VariableElementVariant } from '../../SlateEditor.constant';
import type { ISlateEditorTwoLineInput } from './types';

const variablesMap = {
  id1: {
    id: 'id1',
    kind: 'variable',
    name: 'Variable 1',
    color: 'hibiscus',
    variant: VariableElementVariant.VARIABLE,
  },
  id2: {
    id: 'id2',
    kind: 'variable',
    name: 'Variable 2',
    color: 'copper',
    variant: VariableElementVariant.VARIABLE,
  },
} as const;

const pluginsOptions = { variablesMap, creatable: true, createButtonLabel: 'Create variable' };

type Story = StoryObj<typeof SlateEditor.SlateEditorTwoLineInput>;

const meta: Meta<typeof SlateEditor.SlateEditorTwoLineInput> = {
  title: 'Inputs/SlateEditor/TwoLineInput',
  component: SlateEditor.SlateEditorTwoLineInput,
  args: {
    lineOne: {
      value: [{ children: [{ text: '' }] }],
      editor: createEditor(),
      pluginsOptions: { [PluginType.VARIABLE]: pluginsOptions },
    },
    lineTwo: {
      value: [{ children: [{ text: '' }] }],
      editor: createEditor(),
      pluginsOptions: { [PluginType.VARIABLE]: pluginsOptions },
    },
  },
  render: (args) => (
    <div style={{ width: '50%' }}>
      <SlateEditor.SlateEditorTwoLineInput {...args} />
    </div>
  ),
};

const defaultValue = [
  {
    children: [
      { text: 'This is a slate editor with variables: ' },
      {
        type: SlateEditor.ElementType.VARIABLE,
        children: [{ text: '' }],
        variableID: 'id1',
        variableVariant: VariableElementVariant.ENTITY,
      },
      { text: ' + ' },
      {
        type: SlateEditor.ElementType.VARIABLE,
        children: [{ text: '' }],
        variableID: 'id2',
        variableVariant: VariableElementVariant.VARIABLE,
      },
      { text: ' and ' },
      {
        type: SlateEditor.ElementType.LINK,
        url: '//voiceflow.com',
        children: [{ text: 'links', color: colorStringToRGBA(linkLightTokens.color.default) }],
      },
      { text: '!' },
    ],
  },
];

export const WithValue: Story = {
  args: {
    lineOne: {
      value: defaultValue,
      editor: createEditor([PluginType.LINK, PluginType.VARIABLE]),
      pluginsOptions: { [PluginType.VARIABLE]: pluginsOptions },
    },
    lineTwo: {
      value: SlateEditor.StaticEditor.createTextState('This is a slate editor with variables'),
      editor: createEditor([PluginType.LINK, PluginType.VARIABLE]),
      pluginsOptions: { [PluginType.VARIABLE]: pluginsOptions },
    },
  },
};

export default meta;

interface ISlateEditorTwoLineInputComponent {
  lineOne: Omit<ISlateEditorTwoLineInput['lineOne'], 'editor'>;
  lineTwo: Omit<ISlateEditorTwoLineInput['lineTwo'], 'editor'>;
}

const Component: React.FC<ISlateEditorTwoLineInputComponent> = (props) => {
  const editor1 = useMemo(() => SlateEditor.createEditor([PluginType.LINK, PluginType.VARIABLE]), []);
  const editor2 = useMemo(() => SlateEditor.createEditor([PluginType.LINK, PluginType.VARIABLE]), []);
  const [variablesMap, setVariablesMap] = useState(props.lineOne.pluginsOptions?.[PluginType.VARIABLE]?.variablesMap);

  const pluginsOptions = useMemo(
    () => ({
      ...props.lineOne.pluginsOptions,
      [PluginType.VARIABLE]: props.lineOne.pluginsOptions?.[PluginType.VARIABLE]
        ? {
            ...props.lineOne.pluginsOptions[PluginType.VARIABLE],
            variablesMap,
            onCreate: (name: string) => {
              const id = `id${Math.random()}`.replace('_', '');

              const variable = {
                id,
                name: name || 'Empty name',
                kind: 'variable',
                color: 'copper',
                variant: VariableElementVariant.VARIABLE,
              } as const;

              setVariablesMap((prev) => ({ ...prev, [id]: variable }));

              return variable;
            },
          }
        : undefined,
    }),
    [props.lineOne.pluginsOptions, variablesMap]
  );

  return (
    <SlateEditor.SlateEditorTwoLineInput
      {...props}
      lineOne={{
        editor: editor1,
        value: props.lineOne.value,
        placeholder: 'Input title',
        pluginsOptions,
      }}
      lineTwo={{
        editor: editor2,
        value: props.lineTwo.value,
        placeholder: 'Input description',
        pluginsOptions,
      }}
    />
  );
};

export const Examples: Story = {
  render: () => {
    return (
      <CartesianProduct<ISlateEditorTwoLineInputComponent>
        columns={2}
        Component={Component}
        componentName={SlateEditor.SlateEditorTwoLineInput.name}
        combinations={{
          lineOne: [
            {
              value: [{ children: [{ text: '' }] }],
              placeholder: 'Input title',
            },
          ],
          lineTwo: [
            {
              value: [{ children: [{ text: '' }] }],
              placeholder: 'Input description',
            },
          ],
        }}
      />
    );
  },
};
