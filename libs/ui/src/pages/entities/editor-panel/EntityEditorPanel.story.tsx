import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/components/Utility/Box';
import { Tokens } from '@/styles';

import { EntityEditorPanel } from './EntityEditorPanel.component';

type Story = StoryObj<typeof EntityEditorPanel>;

const meta: Meta<typeof EntityEditorPanel> = {
  title: 'Pages / Entities / EntityEditorPanel',
  component: EntityEditorPanel,
};

export const Base: Story = {
  args: {
    entity: {
      dataType: 'Custom text',
      name: 'Cars',
      values: [
        { id: '0', firstLine: { value: 'BMW' }, secondLine: { value: 'Bayerische Motoren Werke AG' } },
        { id: '1', firstLine: { value: 'Audi' }, secondLine: { value: 'Audi AG' } },
      ],
    },
  },
  render: (args) => (
    <Box
      width="350px"
      height="auto"
      style={{
        borderLeft: `1px solid ${Tokens.colors.neutralLight.neutralsLight50}`,
        borderTop: `1px solid ${Tokens.colors.neutralLight.neutralsLight50}`,
      }}
    >
      <EntityEditorPanel {...args} />
    </Box>
  ),
};

export default meta;
