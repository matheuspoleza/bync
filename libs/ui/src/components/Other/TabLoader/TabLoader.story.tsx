import type { Meta, StoryObj } from '@storybook/react';

import { PrimaryNavigation } from '@/components/Navigation/PrimaryNavigation';
import { Box } from '@/components/Utility';
import { colors } from '@/styles/theme';

import { TabLoader } from './TabLoader.component';
import { baseButton } from './TabLoader.css';

const meta: Meta<typeof TabLoader> = {
  title: 'Other / Tab Loader',
  component: TabLoader,
};

export default meta;
type Story = StoryObj<typeof TabLoader>;

const onClick = () => console.log;

export const Examples: Story = {
  render: () => (
    <Box width="800px" height="560px">
      <Box height="100%" direction="column">
        <Box style={{ backgroundColor: colors.neutralDark.neutralsDark800 }} width="56px">
          <PrimaryNavigation.Item
            onClick={onClick}
            iconName="VoiceflowLogomark"
            iconProps={{ width: '24px', height: '24px' }}
            className={baseButton}
          />
        </Box>
        <PrimaryNavigation>
          <PrimaryNavigation.Section>
            <PrimaryNavigation.Item iconName="Designer" isActive onClick={onClick} />
            <PrimaryNavigation.Item iconName="Api" onClick={onClick} />
            <PrimaryNavigation.Item iconName="Measure" onClick={onClick} />
            <PrimaryNavigation.Item iconName="Settings" onClick={onClick} />
          </PrimaryNavigation.Section>
          <PrimaryNavigation.Section>
            <PrimaryNavigation.Item iconName="Info" onClick={onClick} />
          </PrimaryNavigation.Section>
        </PrimaryNavigation>
      </Box>
      <Box height="100%" width="100%">
        <TabLoader variant="dark" />
      </Box>
    </Box>
  ),
};
