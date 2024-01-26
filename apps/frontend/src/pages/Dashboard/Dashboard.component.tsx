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
import { Outlet, useNavigate } from 'react-router-dom';
import { useYNAB } from '../../hooks/ynab';

const SECONDARY_WIDTH = Tokens.layout.secondaryMenu.width;

export const DashboardPage: React.FC<IBox> = () => {
  const [secondSearch, setSecondSearch] = useState('');
  const navigate = useNavigate();
  useYNAB(true);

  const { activeTab: activeSecondaryTab, switchTab: setActiveSecondaryTab } =
    useTabChange<DashboardTabs>(DashboardTabs.HOME);

  const secondaryTabProps = (tab: DashboardTabs, icon: IconName) => ({
    icon,
    isActive: activeSecondaryTab === tab,
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80px"
              zoomAndPan="magnify"
              viewBox="0 0 810 809.999993"
              height="80px"
              preserveAspectRatio="xMidYMid meet"
              version="1.0"
            >
              <defs>
                <clipPath id="24d90926ba">
                  <path
                    d="M 290.789062 243 L 442 243 L 442 394 L 290.789062 394 Z M 290.789062 243 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="522882ff83">
                  <path
                    d="M 290.789062 416 L 519.539062 416 L 519.539062 567 L 290.789062 567 Z M 290.789062 416 "
                    clip-rule="nonzero"
                  />
                </clipPath>
              </defs>
              <g clip-path="url(#24d90926ba)">
                <path
                  fill="#ffffff"
                  d="M 366.433594 243 C 324.746094 243 290.949219 276.796875 290.949219 318.480469 L 290.949219 393.964844 L 366.433594 393.964844 C 408.117188 393.964844 441.914062 360.167969 441.914062 318.480469 L 441.914062 243 Z M 366.433594 243 "
                  fill-opacity="1"
                  fill-rule="nonzero"
                />
              </g>
              <g clip-path="url(#522882ff83)">
                <path
                  fill="#ffffff"
                  d="M 448.0625 416.042969 L 290.949219 416.042969 L 290.949219 491.523438 C 290.949219 533.203125 324.738281 567.007812 366.433594 567.007812 L 519.039062 567.007812 L 519.039062 487.019531 C 519.039062 447.820312 487.257812 416.042969 448.0625 416.042969 Z M 448.0625 416.042969 "
                  fill-opacity="1"
                  fill-rule="nonzero"
                />
              </g>
            </svg>
          </Box>

          <SecondaryNavigation.Section isCollapsible={false}>
            <SecondaryNavigation.Item
              label="Dashboard"
              {...secondaryTabProps(DashboardTabs.HOME, 'Home')}
            />
          </SecondaryNavigation.Section>

          <SecondaryNavigation.Section title="Seus dados" isCollapsible={false}>
            <SecondaryNavigation.Item
              label="Budgets"
              caption="4"
              {...secondaryTabProps(DashboardTabs.BUDGETS, 'Configure')}
            />
            <SecondaryNavigation.Item
              label="Contas"
              caption="61"
              {...secondaryTabProps(DashboardTabs.SOURCES, 'Flows')}
            />
            <SecondaryNavigation.Item
              label="Conexões"
              caption="48"
              {...secondaryTabProps(DashboardTabs.CONNECTIONS, 'AddData')}
            />
            <SecondaryNavigation.Item
              label="Transações"
              caption="150"
              {...secondaryTabProps(DashboardTabs.TRANSACTIONS, 'Minimize')}
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
