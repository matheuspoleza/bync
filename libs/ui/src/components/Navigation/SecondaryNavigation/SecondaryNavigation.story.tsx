import type { Meta, StoryObj } from '@storybook/react';
import type { IconName } from '@bync/icons';
import { useState } from 'react';

import { Dropdown } from '@/components/Form/Dropdown/Dropdown.component';
import { Box } from '@/components/Utility/Box';

import { SecondaryNavigation } from '.';

type Story = StoryObj<typeof SecondaryNavigation>;

const meta: Meta<typeof SecondaryNavigation> = {
  title: 'Navigation/Secondary Navigation',
  component: SecondaryNavigation,
};

export default meta;

export const Examples: Story = {
  render: () => {
    const [active, setActive] = useState('Generate');

    const itemProps = (icon: IconName) => ({
      icon,
      isActive: active === icon,
      onClick: () => setActive(icon),
    });

    return (
      <Box width="256px" height="800px">
        <SecondaryNavigation
          title="Agent name loooooooooong"
          rightAction={
            <Dropdown variant="dark" fontSize="caption" weight="semiBold" isSmall value="En" onSelect={console.log}>
              {() => <></>}
            </Dropdown>
          }
        >
          <SecondaryNavigation.Section title="Agent" isCollapsible={false}>
            <SecondaryNavigation.Item label="Storyboard" caption="42" {...itemProps('Home')} />
            <SecondaryNavigation.Item label="Knowledge" caption="61" {...itemProps('Brain')} />
            <SecondaryNavigation.Item label="FAQs" caption="48" {...itemProps('NoMatch')} />
            <SecondaryNavigation.Item label="Persona" caption="Default" {...itemProps('Persona')} />
          </SecondaryNavigation.Section>

          <SecondaryNavigation.Section title="Content">
            <SecondaryNavigation.Item label="Responses" caption="72" {...itemProps('Message')} />
            <SecondaryNavigation.Item label="Prompts" caption="11" {...itemProps('Generate')} />
            <SecondaryNavigation.Item label="Variables" caption="38" {...itemProps('Variable')} />
            <SecondaryNavigation.Item label="Events" caption="8" {...itemProps('Event')} />
            <SecondaryNavigation.Item label="Functions" caption="7" {...itemProps('Code')} />
          </SecondaryNavigation.Section>

          <SecondaryNavigation.Section title="Natural language">
            <SecondaryNavigation.Item label="Intents" caption="72" {...itemProps('Intent')} />
            <SecondaryNavigation.Item label="Entities" caption="11" {...itemProps('Set')} />
          </SecondaryNavigation.Section>

          <SecondaryNavigation.Section title="Insights">
            <SecondaryNavigation.Item
              variant="alert"
              label="Conflicts"
              icon="Warning"
              caption="1 new"
              onClick={console.log}
            />
            <SecondaryNavigation.Item
              variant="new"
              label="Suggestions"
              icon="Generate"
              caption="2 new"
              onClick={console.log}
            />
          </SecondaryNavigation.Section>
        </SecondaryNavigation>
      </Box>
    );
  },
};
