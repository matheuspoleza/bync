import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';
import { linkTokens } from '@/styles/theme/components';
import { colorStringToRGBA } from '@/utils/colors/color.util';

import { createEditor } from '../../editor/editor';
import { ElementType, PluginType, VariableElementVariant } from '../../SlateEditor.constant';
import type { ISlateEditor } from '../../SlateEditor.interface';
import { Preview } from './Preview.component';

interface IVariable {
  id: string;
  kind: string;
  name: string;
  color: string;
  variant: VariableElementVariant;
}

const createVariable = ({ id, kind, name, color, variant }: IVariable) => ({
  id,
  kind,
  name,
  color,
  variant,
});

const variablesMap = {
  id1: createVariable({
    id: 'id1',
    kind: 'entity',
    name: 'Variable 1',
    color: '#CB627B',
    variant: VariableElementVariant.ENTITY,
  }),
  id2: createVariable({
    id: 'id2',
    kind: 'entity',
    name: 'Variable 2',
    color: '#DC8879',
    variant: VariableElementVariant.ENTITY,
  }),
  id3: createVariable({
    id: 'id3',
    kind: 'entity',
    name: 'Variable 3',
    color: '#5B9FD7',
    variant: VariableElementVariant.ENTITY,
  }),
  id4: createVariable({
    id: 'id4',
    kind: 'entity',
    name: 'Variable 4',
    color: '#56B365',
    variant: VariableElementVariant.ENTITY,
  }),
  id5: createVariable({
    id: 'id5',
    kind: 'entity',
    name: 'Variable 5',
    color: '#DC8879',
    variant: VariableElementVariant.ENTITY,
  }),
  id6: createVariable({
    id: 'id6',
    kind: 'entity',
    name: 'Variable 6',
    color: '#515A63',
    variant: VariableElementVariant.ENTITY,
  }),
  id7: createVariable({
    id: 'id7',
    kind: 'variable',
    name: 'Variable 7',
    color: '#DC8879',
    variant: VariableElementVariant.VARIABLE,
  }),
  id8: createVariable({
    id: 'id8',
    kind: 'variable',
    name: 'Variable 8',
    color: '#56B365',
    variant: VariableElementVariant.VARIABLE,
  }),
  id9: createVariable({
    id: 'id9',
    kind: 'variable',
    name: 'Variable 9',
    color: '#515A63',
    variant: VariableElementVariant.VARIABLE,
  }),
  id10: createVariable({
    id: 'id10',
    kind: 'variable',
    name: 'Variable 10',
    color: '#5B9FD7',
    variant: VariableElementVariant.VARIABLE,
  }),
  id11: createVariable({
    id: 'id11',
    kind: 'variable',
    name: 'Variable 11',
    color: '#DC8879',
    variant: VariableElementVariant.VARIABLE,
  }),
  id12: createVariable({
    id: 'id12',
    kind: 'variable',
    name: 'Variable 12',
    color: '#5B9FD7',
    variant: VariableElementVariant.VARIABLE,
  }),
  id13: createVariable({
    id: 'id13',
    kind: 'variable',
    name: 'Variable 13',
    color: '#515A63',
    variant: VariableElementVariant.VARIABLE,
  }),
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

const pluginsOptions = { variablesMap, creatable: true, createButtonLabel: 'Create variable' };

type Story = StoryObj<typeof Preview>;

const meta: Meta<typeof Preview> = {
  title: 'Inputs/SlateEditor/Preview',
  component: Preview,
  args: {},
  render: (args) => (
    <div style={{ width: '50%' }}>
      <Preview {...args} />
    </div>
  ),
};

export default meta;

export const Empty: Story = {
  args: {
    value: [{ children: [{ text: '' }] }],
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

export const WithValueDisabled: Story = {
  args: {
    value: defaultValue,
    editor: createEditor([PluginType.LINK, PluginType.VARIABLE]),
    disabled: true,
    placeholder: 'Placeholder',
    pluginsOptions: { [PluginType.VARIABLE]: pluginsOptions },
  },
};

const Component = (props: ISlateEditor) => (
  <Preview {...props} pluginsOptions={{ [PluginType.VARIABLE]: pluginsOptions }} />
);

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ISlateEditor>
      columns={2}
      Component={Component}
      componentName={Preview.name}
      combinations={{
        value: [[{ children: [{ text: '' }] }], defaultValue],
        disabled: [false, true],
        placeholder: ['Placeholder'],
        pluginsOptions: [{ [PluginType.VARIABLE]: pluginsOptions }],
      }}
    />
  ),
};
