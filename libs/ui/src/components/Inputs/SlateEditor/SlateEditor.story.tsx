import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

import { Box } from '@/components/Utility';
import { CartesianProduct } from '@/storybook/CartesianProduct';
import { WithFormControlState } from '@/storybook/decorators';
import { linkTokens } from '@/styles/theme/components';
import { colorStringToRGBA, defaultColors } from '@/utils/colors/color.util';

import { createEditor } from './editor/editor';
import * as SlateEditor from './index';
import { ElementType, PluginType, VariableElementVariant } from './SlateEditor.constant';
import type { ISlateEditor } from './SlateEditor.interface';

const variablesMap = {
  id1: {
    id: 'id1',
    kind: 'entity',
    name: 'Variable 1',
    color: defaultColors.hibiscus,
    variant: VariableElementVariant.ENTITY,
  },
  id2: {
    id: 'id2',
    kind: 'entity',
    name: 'Variable 2',
    color: defaultColors.copper,
    variant: VariableElementVariant.ENTITY,
  },
  id3: {
    id: 'id3',
    kind: 'entity',
    name: 'Variable 3',
    color: defaultColors.havelock,
    variant: VariableElementVariant.ENTITY,
  },
  id4: {
    id: 'id4',
    kind: 'entity',
    name: 'Variable 4',
    color: defaultColors.fern,
    variant: VariableElementVariant.ENTITY,
  },
  id5: {
    id: 'id5',
    kind: 'entity',
    name: 'Variable 5',
    color: defaultColors.copper,
    variant: VariableElementVariant.ENTITY,
  },
  id6: {
    id: 'id6',
    kind: 'entity',
    name: 'Variable 6',
    color: defaultColors.neutral,
    variant: VariableElementVariant.ENTITY,
  },
  id7: {
    id: 'id7',
    kind: 'variable',
    name: 'Variable 7',
    color: defaultColors.copper,
    variant: VariableElementVariant.VARIABLE,
  },
  id8: {
    id: 'id8',
    kind: 'variable',
    name: 'Variable 8',
    color: defaultColors.fern,
    variant: VariableElementVariant.VARIABLE,
  },
  id9: {
    id: 'id9',
    kind: 'variable',
    name: 'Variable 9',
    color: defaultColors.neutral,
    variant: VariableElementVariant.VARIABLE,
  },
  id10: {
    id: 'id10',
    kind: 'variable',
    name: 'Variable 10',
    color: defaultColors.havelock,
    variant: VariableElementVariant.VARIABLE,
  },
  id11: {
    id: 'id11',
    kind: 'variable',
    name: 'Variable 11',
    color: defaultColors.copper,
    variant: VariableElementVariant.VARIABLE,
  },
  id12: {
    id: 'id12',
    kind: 'variable',
    name: 'Variable 12',
    color: defaultColors.havelock,
    variant: VariableElementVariant.VARIABLE,
  },
  id13: {
    id: 'id13',
    kind: 'variable',
    name: 'Variable 13',
    color: defaultColors.neutral,
    variant: VariableElementVariant.VARIABLE,
  },
} as const;

const defaultValue = [
  {
    children: [
      { text: 'This is a slate editor with variables: ' },
      {
        type: ElementType.VARIABLE,
        children: [{ text: '' }],
        variableID: 'id1',
        variableVariant: VariableElementVariant.ENTITY,
      },
      { text: ' + ' },
      {
        type: ElementType.VARIABLE,
        children: [{ text: '' }],
        variableID: 'id2',
        variableVariant: VariableElementVariant.VARIABLE,
      },
      { text: ' and ' },
      {
        type: ElementType.LINK,
        url: '//voiceflow.com',
        children: [{ text: 'links', color: colorStringToRGBA(linkTokens.linkLightTokens.color.default) }],
      },
      { text: '!' },
    ],
  },
];

const pluginsOptions = { variablesMap, canCreate: true, createButtonLabel: 'Create variable' };

type Story = StoryObj<typeof SlateEditor.Component>;

const meta: Meta<typeof SlateEditor.Component> = {
  title: 'Inputs/SlateEditor',
  component: SlateEditor.Component,
  args: {},
  decorators: [WithFormControlState],
  render: (args) => (
    <div style={{ width: '50%' }}>
      <SlateEditor.Component {...args} />
    </div>
  ),
};

export default meta;

export const Empty: Story = {
  args: {
    value: [{ children: [{ text: '' }] }],
    editor: createEditor(),
    placeholder: 'Placeholder',
  },
};

export const WithValue: Story = {
  args: {
    value: defaultValue,
    editor: createEditor([PluginType.LINK, PluginType.VARIABLE]),
    placeholder: 'Placeholder',
    pluginsOptions: { [PluginType.VARIABLE]: pluginsOptions },
  },
};

export const WithSingleLine: Story = {
  args: {
    value: defaultValue,
    editor: createEditor([PluginType.LINK, PluginType.VARIABLE, PluginType.SINGLE_LINE]),
    placeholder: 'Placeholder',
    pluginsOptions: { [PluginType.VARIABLE]: pluginsOptions },
  },
};

export const WithSingleNowrapLine: Story = {
  args: {
    value: defaultValue,
    editor: createEditor([PluginType.LINK, PluginType.VARIABLE, PluginType.SINGLE_LINE]),
    placeholder: 'Placeholder',
    pluginsOptions: { [PluginType.VARIABLE]: pluginsOptions, [PluginType.SINGLE_LINE]: { nowrap: true } },
  },
};

export const WithValueDisabled: Story = {
  args: {
    value: defaultValue,
    editor: createEditor([PluginType.LINK, PluginType.VARIABLE]),
    disabled: true,
    placeholder: 'Placeholder',
    pluginsOptions: { [PluginType.VARIABLE]: pluginsOptions },
  },
};

export const WithHeader: Story = {
  args: {
    value: defaultValue,
    editor: createEditor([PluginType.LINK, PluginType.VARIABLE]),
    header: (
      <>
        <Box>
          <SlateEditor.TextBoldButton />
          <SlateEditor.TextItalicButton />
          <SlateEditor.TextUnderlineButton />
          <SlateEditor.TextStrikeThroughButton />
          <SlateEditor.HyperlinkButton />
        </Box>
      </>
    ),
    placeholder: 'Placeholder',
    pluginsOptions: { [PluginType.VARIABLE]: pluginsOptions },
  },
};

const Component = (props: ISlateEditor) => {
  const editor = useMemo(() => createEditor([PluginType.LINK, PluginType.VARIABLE]), []);
  const [variablesMap, setVariablesMap] = useState(props.pluginsOptions?.[PluginType.VARIABLE]?.variablesMap);

  const pluginsOptions = useMemo(
    () => ({
      ...props.pluginsOptions,
      [PluginType.VARIABLE]: props.pluginsOptions?.[PluginType.VARIABLE]
        ? {
            ...props.pluginsOptions[PluginType.VARIABLE],
            variablesMap,
            onCreate: (name: string) => {
              const id = `id${Math.random()}`.replace('_', '');

              const variable = {
                id,
                name: name || 'Empty name',
                kind: 'variable',
                color: defaultColors.copper,
                variant: VariableElementVariant.VARIABLE,
              } as const;

              setVariablesMap((prev) => ({ ...prev, [id]: variable }));

              return variable;
            },
          }
        : undefined,
    }),
    [props.pluginsOptions, variablesMap]
  );

  return <SlateEditor.Component {...props} pluginsOptions={pluginsOptions} editor={editor} />;
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ISlateEditor>
      columns={2}
      Component={Component}
      componentName={SlateEditor.Component.name}
      combinations={{
        value: [[{ children: [{ text: '' }] }], defaultValue],
        disabled: [false, true],
        placeholder: ['Placeholder'],
        pluginsOptions: [
          { [PluginType.VARIABLE]: { canCreate: true, createButtonLabel: 'Create variable' } },
          { [PluginType.VARIABLE]: pluginsOptions },
        ],
        header: [
          undefined,
          <>
            <Box>
              <SlateEditor.TextBoldButton />
              <SlateEditor.TextItalicButton />
              <SlateEditor.TextUnderlineButton />
              <SlateEditor.TextStrikeThroughButton />
              <SlateEditor.HyperlinkButton />
            </Box>
          </>,
        ],
      }}
    />
  ),
};
