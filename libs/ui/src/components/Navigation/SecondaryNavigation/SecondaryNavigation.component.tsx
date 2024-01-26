import { Header } from '@/components/Navigation/Header';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';

import { agentNameStyle, containerStyle, headerStyle } from './SecondaryNavigation.css';
import type { ISecondaryNavigation } from './types';
import { Avatar } from '@/main';

export const SecondaryNavigation: React.FC<ISecondaryNavigation> = ({
  title,
  avatar,
  rightAction,
  children,
  testID,
}) => {
  return (
    <Box as="section" direction="column" className={containerStyle} testID={testID}>
      {title && (
        <Header kind="secondaryNavigation" className={headerStyle}>
          <Header.Section.Left>
            <Box align="center" gap="8px">
              {avatar && <Avatar variant={avatar} />}

              <Text overflow className={agentNameStyle}>
                {title}
              </Text>
            </Box>
          </Header.Section.Left>

          <Header.Section.Right>{rightAction}</Header.Section.Right>
        </Header>
      )}
      {children}
    </Box>
  );
};
