import type { Meta, StoryObj } from '@storybook/react';

import { Mapper, SlateEditor } from '@/components';
import { createEditor, ElementType, PluginType, VariableElementVariant } from '@/components/Inputs/SlateEditor';
import type { IMapper } from '@/components/Other/Mapper';
import { CartesianProduct } from '@/storybook/CartesianProduct';

type Story = StoryObj<typeof Mapper>;

const variablesMap = {
  id1: {
    id: 'id1',
    kind: 'variable',
    name: 'Variable 1',
    color: '#CB627B',
    variant: VariableElementVariant.VARIABLE,
  },
  id2: {
    id: 'id2',
    kind: 'variable',
    name: 'Variable 2',
    color: '#DC8879',
    variant: VariableElementVariant.VARIABLE,
  },
} as const;

const VariableComponent = ({ value }: { value: string }) => {
  const editor = createEditor([PluginType.VARIABLE]);

  return (
    <SlateEditor.Component
      key={1}
      editor={editor}
      pluginsOptions={{
        [PluginType.VARIABLE]: { canCreate: true, createButtonLabel: 'Create variable', variablesMap },
      }}
      placeholder="Assign to {var}"
      value={[
        {
          children: [
            {
              type: ElementType.VARIABLE,
              children: [{ text: value }],
              variableID: 'id2',
              variableVariant: VariableElementVariant.VARIABLE,
            },
          ],
        },
      ]}
    />
  );
};

const TextComponent = ({ value, placeholder = 'Placeholder' }: { value: string; placeholder?: string }) => {
  const editor = createEditor([PluginType.VARIABLE]);

  return (
    <SlateEditor.Component
      key={1}
      placeholder={placeholder}
      editor={editor}
      pluginsOptions={{
        [PluginType.VARIABLE]: { canCreate: true, createButtonLabel: 'Create variable', variablesMap },
      }}
      value={[
        {
          children: [{ text: value }],
        },
      ]}
    />
  );
};

const meta: Meta<typeof Mapper> = {
  title: 'Other/Mapper',
  component: Mapper,
};

export default meta;

export const Base: Story = {
  args: {
    equalityIcon: 'equal',
    leftHandSide: 'Value',
    rightHandSide: 'Value',
  },
  render: (args) => (
    <div style={{ width: 500 }}>
      <Mapper {...args} />
      <Mapper {...args} />
    </div>
  ),
};

export const Examples: Story = {
  args: {},
  render: () => (
    <>
      <CartesianProduct<IMapper>
        componentName={Mapper.name}
        Component={(props) => (
          <div style={{ maxWidth: 450, width: '100%' }}>
            <Mapper {...props} />
          </div>
        )}
        combinations={{
          equalityIcon: ['equal', 'arrow', undefined],
          leftHandSide: [
            <VariableComponent key={1} value="Variable" />,
            <TextComponent key={2} value="Account-ID" />,
            <TextComponent key={2} value="" placeholder="Assign to {var}" />,
          ],
          rightHandSide: [
            <VariableComponent key={1} value="Variable" />,
            <TextComponent
              key={2}
              value="authorization,contentlength,content-type,user-agent,x-applica tion-id,x-marial"
            />,
            <TextComponent key={2} value="" />,
          ],
        }}
        columns={2}
        center
      />
    </>
  ),
};
