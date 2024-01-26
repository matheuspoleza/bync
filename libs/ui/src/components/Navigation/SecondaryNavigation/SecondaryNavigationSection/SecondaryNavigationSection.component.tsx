import React from 'react';

import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';
import { Collapsible, CollapsibleHeader, CollapsibleHeaderButton } from '@/components/Utility/Collapsible';

import type { ISecondaryNavigationSection } from '../types';
import {
  containerStyles,
  contentStyle,
  secondaryNavigationSectionTitleContainer,
} from './SecondaryNavigationSection.css';

export const SecondaryNavigationSection: React.FC<ISecondaryNavigationSection> = ({
  title = '',
  isCollapsible = true,
  children,
}) => {
  return isCollapsible ? (
    <Collapsible
      header={
        <CollapsibleHeader label={title} className={containerStyles}>
          {({ isOpen }) => <CollapsibleHeaderButton isOpen={isOpen} variant="dark" />}
        </CollapsibleHeader>
      }
      showDivider={false}
      contentClassName={contentStyle}
      isOpen
    >
      <Box direction="column">
        <Box px={0} py={0} direction="column">
          {children}
        </Box>
      </Box>
    </Collapsible>
  ) : (
    <Box direction="column">
      {title && (
        <Box className={secondaryNavigationSectionTitleContainer}>
          <Text weight="semiBold">{title}</Text>
        </Box>
      )}
      <Box px={12} py={0} direction="column">
        {children}
      </Box>
    </Box>
  );
};
