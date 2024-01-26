import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '@/components/Text/Text.component';
import { CartesianProduct } from '@/storybook/CartesianProduct';
import { colors } from '@/styles/theme';

import { Box } from '../Box/Box.component';
import { Removable } from './Removable.component';
import type { IRemovable } from './types';

type Story = StoryObj<typeof Removable>;

const meta: Meta<typeof Removable> = {
  title: 'Utility/Removable',
  component: Removable,
  args: {
    gap: 12,
  },
};

export const Base: Story = {
  args: {
    children: (
      <Box direction="column">
        <Text>Entity Text Value</Text>
        <Text variant="caption" style={{ color: colors.neutralDark.neutralsDark50 }}>
          Add synonyms, comma seperated
        </Text>
      </Box>
    ),
    onRemove: () => console.log('Remove'),
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IRemovable & { longText?: boolean }>
      componentName={Removable.name}
      Component={({ longText, ...props }) => (
        <Box style={{ width: '100%' }}>
          <Removable {...props} onRemove={() => console.log('remove')}>
            {longText ? (
              <Box direction="column" key="long_message">
                <Text style={{ color: colors.neutralDark.neutralsDark900 }}>Entity Text Value</Text>
                <Text variant="caption" style={{ color: colors.neutralDark.neutralsDark50 }}>
                  Add synonyms, comma seperated, really long text
                </Text>
                <Text variant="caption" style={{ color: colors.alert.alert700 }}>
                  Error message here
                </Text>
              </Box>
            ) : (
              <Box direction="column" key="short_text">
                <Text style={{ color: colors.neutralDark.neutralsDark900 }}>Entity Text Value</Text>
                <Text variant="caption" style={{ color: colors.neutralDark.neutralsDark50 }}>
                  Add synonyms, comma seperated
                </Text>
              </Box>
            )}
          </Removable>
        </Box>
      )}
      combinations={{
        disabled: [false, true],
        longText: [false, true],
      }}
      columns={2}
    />
  ),
};

export default meta;
