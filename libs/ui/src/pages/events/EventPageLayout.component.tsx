import { useState } from 'react';

import { CircleButton, Divider } from '@/components';
import { Dropdown } from '@/components/Form';
import { SearchInput } from '@/components/Inputs';
import { Header, Menu, MenuItem, PrimaryNavigation, SecondaryNavigation } from '@/components/Navigation';
import { TableNavigation } from '@/components/Table/TableNavigation';
import { Box } from '@/components/Utility';
import { Popper } from '@/components/Utility/Popper';

import { fabStyles, pageContent, pageStyles } from './EventPageLayout.css';

export interface IEventsPageView {
  content: React.ReactNode;
}

export const EventPageLayout: React.FC<IEventsPageView> = ({ content }) => {
  const [secondSearch, setSecondSearch] = useState('');

  return (
    <Box className={pageStyles}>
      <Box width="56px" height="100vh" id="primary-navigation">
        <PrimaryNavigation>
          <PrimaryNavigation.Section>
            <PrimaryNavigation.Header>
              <MenuItem label="Logout" onClick={() => null} />
            </PrimaryNavigation.Header>
            <PrimaryNavigation.Item iconName="Designer" />
            <PrimaryNavigation.Item iconName="Api" />
            <PrimaryNavigation.Item iconName="Measure" />
            <PrimaryNavigation.Item iconName="Settings" />
          </PrimaryNavigation.Section>
          <PrimaryNavigation.Section>
            <PrimaryNavigation.Item iconName="Info" />
          </PrimaryNavigation.Section>
        </PrimaryNavigation>
      </Box>
      <Box width="256px" height="100vh" id="secondary-navigation">
        <SecondaryNavigation
          title="Agent name"
          rightAction={
            <Dropdown variant="dark" fontSize="caption" weight="semiBold" isSmall value="Dev" onSelect={() => null}>
              {() => null}
            </Dropdown>
          }
        >
          <SecondaryNavigation.Section title="Agent" isCollapsible={false}>
            <SecondaryNavigation.Item icon="Home" onClick={() => null} label="Storyboard" caption="42" />
            <SecondaryNavigation.Item icon="Brain" onClick={() => null} label="Knowledge" caption="61" />
            <SecondaryNavigation.Item icon="NoMatch" onClick={() => null} label="FAQs" caption="48" />
          </SecondaryNavigation.Section>

          <SecondaryNavigation.Section title="Content">
            <SecondaryNavigation.Item icon="Message" onClick={() => null} label="Responses" caption="72" />
            <SecondaryNavigation.Item icon="Generate" onClick={() => null} label="Prompts" caption="11" />
            <SecondaryNavigation.Item icon="Flows" onClick={() => null} label="Flows" caption="18" />
            <SecondaryNavigation.Item icon="Variable" onClick={() => null} label="Variables" caption="38" />
            <SecondaryNavigation.Item
              isActive={true}
              icon="SmallEvent"
              onClick={() => null}
              label="Events"
              caption="8"
            />
            <SecondaryNavigation.Item icon="Code" onClick={() => null} label="Functions" caption="7" />
          </SecondaryNavigation.Section>

          <SecondaryNavigation.Section title="Natural language">
            <SecondaryNavigation.Item icon="IntentS" onClick={() => null} label="Intents" caption="72" />
            <SecondaryNavigation.Item icon="Set" onClick={() => null} label="Entities" caption="11" />
          </SecondaryNavigation.Section>
        </SecondaryNavigation>
      </Box>
      <Box width="calc(100vw - 256px - 56px)" direction="column">
        <Header variant="search">
          <Header.Section.Left>
            <SearchInput
              variant="dark"
              withIconAnimation={false}
              placeholder="Search events"
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
              <Header.Button.Secondary label="Share" />
              <Popper
                referenceElement={({ onOpen, ref }) => (
                  <span ref={ref}>
                    <Header.Button.Primary label="New Event" onClick={onOpen} />
                  </span>
                )}
              >
                {() => <Menu width={149}></Menu>}
              </Popper>
            </Header.Section.RightActions>
          </Header.Section.Right>
        </Header>
        <Box direction="column">
          <TableNavigation
            breadCrumbsItems={[{ label: 'Agent Name' }, { label: 'All Events (0)' }]}
            onImportClick={() => null}
            onSettingsClick={() => null}
          />
          <Divider noPadding={true} />
        </Box>
        {/* Page Content */}
        <section className={pageContent}>
          {content}
          <div className={fabStyles}>
            <CircleButton iconName="PlayS" onClick={() => null} />
          </div>
        </section>
      </Box>
    </Box>
  );
};
