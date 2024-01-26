import { type IconName } from '@bync/icons';
import { useState } from 'react';

import { Dropdown } from '@/components/Form';
import { SearchInput } from '@/components/Inputs';
import { Header, MenuItem, PrimaryNavigation, SecondaryNavigation } from '@/components/Navigation';
import type { IBox } from '@/components/Utility';
import { Box } from '@/components/Utility';
import { layout } from '@/styles/theme';

import { DataSourcesMenu } from './components/DataSourcesMenu';
import { ModalSwitcher } from './components/ModalSwitcher';
import { useTabChange } from './hooks/useTabChange';
import type { IMockDataSource } from './mock';

const SECONDARY_WIDTH = layout.secondaryMenu.width;

export const DataSourceEmptyView: React.FC<IBox> = ({ children }) => {
  const [secondSearch, setSecondSearch] = useState('');
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const { activeTab: activePrimaryTab, switchTab: setActivePrimaryTab } = useTabChange('Generate');
  const { activeTab: activeSecondaryTab, switchTab: setActiveSecondaryTab } = useTabChange('Generate');

  const primaryTabProps = (icon: IconName) => ({
    icon,
    isActive: activePrimaryTab === icon,
    onClick: () => setActivePrimaryTab(icon),
  });

  const secondaryTabProps = (icon: IconName) => ({
    icon,
    isActive: activeSecondaryTab === icon,
    onClick: () => setActiveSecondaryTab(icon),
  });

  return (
    <Box>
      <ModalSwitcher activeModal={activeModal} setActiveModal={setActiveModal} />
      <Box width="56px" height="100vh" id="primary-navigation">
        <PrimaryNavigation>
          <PrimaryNavigation.Section>
            <PrimaryNavigation.Header>
              <MenuItem label="Logout" onClick={() => null} />
            </PrimaryNavigation.Header>
            <PrimaryNavigation.Item iconName="Designer" {...primaryTabProps('Designer')} />
            <PrimaryNavigation.Item iconName="Api" {...primaryTabProps('Api')} />
            <PrimaryNavigation.Item iconName="Measure" {...primaryTabProps('Measure')} />
            <PrimaryNavigation.Item iconName="Settings" {...primaryTabProps('Settings')} />
          </PrimaryNavigation.Section>
          <PrimaryNavigation.Section>
            <PrimaryNavigation.Item iconName="Info" />
          </PrimaryNavigation.Section>
        </PrimaryNavigation>
      </Box>
      <Box width={`${SECONDARY_WIDTH}px`} height="100vh" id="secondary-navigation">
        <SecondaryNavigation
          title="Agent name"
          rightAction={
            <Dropdown variant="dark" fontSize="caption" weight="semiBold" isSmall value="En" onSelect={() => null}>
              {() => null}
            </Dropdown>
          }
        >
          <SecondaryNavigation.Section title="Agent" isCollapsible={false}>
            <SecondaryNavigation.Item label="Storyboard" caption="42" {...secondaryTabProps('Home')} />
            <SecondaryNavigation.Item label="Knowledge" caption="61" {...secondaryTabProps('Brain')} />
            <SecondaryNavigation.Item label="FAQs" caption="48" {...secondaryTabProps('NoMatch')} />
            <SecondaryNavigation.Item label="Persona" caption="Default" {...secondaryTabProps('Persona')} />
          </SecondaryNavigation.Section>

          <SecondaryNavigation.Section title="Content">
            <SecondaryNavigation.Item label="Responses" caption="72" {...secondaryTabProps('Message')} />
            <SecondaryNavigation.Item label="Prompts" caption="11" {...secondaryTabProps('Generate')} />
            <SecondaryNavigation.Item label="Flows" caption="18" {...secondaryTabProps('Flows')} />
            <SecondaryNavigation.Item label="Variables" caption="38" {...secondaryTabProps('Variable')} />
            <SecondaryNavigation.Item label="Events" caption="8" {...secondaryTabProps('Event')} />
            <SecondaryNavigation.Item label="Functions" caption="7" {...secondaryTabProps('Code')} />
          </SecondaryNavigation.Section>

          <SecondaryNavigation.Section title="Natural language">
            <SecondaryNavigation.Item label="Intents" caption="72" {...secondaryTabProps('Intent')} />
            <SecondaryNavigation.Item label="Entities" caption="11" {...secondaryTabProps('Set')} />
          </SecondaryNavigation.Section>

          <SecondaryNavigation.Section title="Insights">
            <SecondaryNavigation.Item
              variant="alert"
              label="Conflicts"
              icon="Warning"
              caption="1 new"
              onClick={() => null}
            />
            <SecondaryNavigation.Item
              variant="new"
              label="Suggestions"
              icon="Generate"
              caption="2 new"
              onClick={() => null}
            />
          </SecondaryNavigation.Section>
        </SecondaryNavigation>
      </Box>

      <Box
        id="content-and-header"
        direction="column"
        style={{ position: 'relative' }}
        width={`calc(100vw - ${SECONDARY_WIDTH}px - 56px)`}
      >
        <Header variant="search">
          <Header.Section.Left>
            <SearchInput
              variant="dark"
              placeholder="Search data sources"
              withIconAnimation={false}
              value={secondSearch}
              onValueChange={setSecondSearch}
            />
          </Header.Section.Left>

          <Header.Section.Right>
            <Header.AvatarList
              list={[
                { name: 'A', variant: 'darkHavelock' },
                { name: 'M', variant: 'darkHibiscus' },
                { name: 'H', variant: 'darkFern' },
                { name: 'C', variant: 'dark' },
              ]}
              onButtonClick={() => null}
            />

            <Header.Section.RightActions>
              <Header.Button.IconSecondary iconName="Settings" />
              <Header.Button.Secondary label="Preview" iconName="PlayS" />

              <DataSourcesMenu onOptionClick={(option: IMockDataSource) => setActiveModal(option.id)} />
            </Header.Section.RightActions>
          </Header.Section.Right>
        </Header>

        <Box id="children" direction="column" width="100%" height="100%" style={{ position: 'absolute', top: '56px' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
