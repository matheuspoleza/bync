import { type IconName } from '@bync/icons';
import { useState } from 'react';

import {
  Header,
  SecondaryNavigation,
  IBox,
  Box,
  SearchInput,
  Tokens,
  Text,
  Avatar,
} from '@bync/ui';

import { useTabChange } from './hooks/useTabChange';
import { DashboardTabs } from './Dashboard.constants';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ByncLogo } from './components/ByncLogo.component';
import { useAtomValue } from 'jotai';
import * as atoms from '../../atoms';

const SECONDARY_WIDTH = Tokens.layout.secondaryMenu.width;

const HEADER_TABS = [
  `/${DashboardTabs.BUDGETS}`,
  `/${DashboardTabs.SOURCES}`,
  `/${DashboardTabs.TRANSACTIONS}`,
  `/${DashboardTabs.CONNECTIONS}`,
];

export const DashboardPage: React.FC<IBox> = () => {
  const [secondSearch, setSecondSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const shouldShowHeader = HEADER_TABS.includes(location.pathname);
  const accountsCount = useAtomValue(atoms.budgets.accountsCount);

  const { switchTab: setActiveSecondaryTab } = useTabChange<DashboardTabs>(
    DashboardTabs.HOME
  );

  const secondaryTabProps = (tab: DashboardTabs, icon: IconName) => ({
    icon,
    isActive: location.pathname.includes(tab),
    onClick: () => {
      setActiveSecondaryTab(tab);
      if (tab === DashboardTabs.HOME) {
        navigate('/');
        return;
      }

      navigate(`/${tab}`);
    },
  });

  return (
    <Box>
      <Box
        width={`${SECONDARY_WIDTH}px`}
        height="100vh"
        id="secondary-navigation"
      >
        <SecondaryNavigation>
          <Box align="center">
            <ByncLogo />
          </Box>

          <SecondaryNavigation.Section isCollapsible={false}>
            <SecondaryNavigation.Item
              label="Dashboard"
              {...secondaryTabProps(DashboardTabs.HOME, 'Home')}
              isActive={location.pathname === '/'}
            />
          </SecondaryNavigation.Section>

          <SecondaryNavigation.Section title="Seus dados" isCollapsible={false}>
            <SecondaryNavigation.Item
              label="Contas Budget"
              caption={accountsCount.toString()}
              {...secondaryTabProps(DashboardTabs.BUDGETS, 'Configure')}
              isActive={location.pathname.includes('budgets')}
            />
            <SecondaryNavigation.Item
              label="Contas Bancárias"
              caption="-"
              {...secondaryTabProps(DashboardTabs.SOURCES, 'Flows')}
              isActive={location.pathname.includes('sources')}
            />
            <SecondaryNavigation.Item
              label="Conexões"
              caption="-"
              {...secondaryTabProps(DashboardTabs.CONNECTIONS, 'AddData')}
              isActive={location.pathname.includes('connections')}
            />
            <SecondaryNavigation.Item
              label="Transações"
              caption="-"
              {...secondaryTabProps(DashboardTabs.TRANSACTIONS, 'Minimize')}
              isActive={location.pathname.includes('transactions')}
            />
          </SecondaryNavigation.Section>

          <Box
            width="100%"
            style={{ position: 'absolute', bottom: 20, cursor: 'pointer' }}
            align="end"
            gap={8}
            pl={20}
          >
            <Avatar variant="darkCopper" />
            <Text color="white">Bem-vindo, Matheus</Text>
          </Box>
        </SecondaryNavigation>
      </Box>

      <Box
        id="content-and-header"
        direction="column"
        style={{ position: 'relative' }}
        width={`calc(100vw - ${SECONDARY_WIDTH}px - 28px)`}
      >
        {shouldShowHeader && (
          <Header variant="search">
            <Header.Section.Left>
              <SearchInput
                variant="dark"
                placeholder={`Procurar ...`}
                withIconAnimation={false}
                value={secondSearch}
                onValueChange={setSecondSearch}
              />
            </Header.Section.Left>

            <Header.Section.Right>
              <Header.Section.RightActions>
                <Header.Button.IconSecondary iconName="Settings" />
                <Header.Button.Primary label="Conectar budgets" />
              </Header.Section.RightActions>
            </Header.Section.Right>
          </Header>
        )}

        <Box
          id="children"
          direction="column"
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: '56px' }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
