import { clsx } from '@bync/style';

import { SquareButton } from '@/components/Buttons';
import { BreadCrumbs } from '@/components/Navigation/BreadCrumbs';
import { Text } from '@/components/Text/Text.component';
import { Box } from '@/components/Utility/Box';
import { Tooltip } from '@/components/Utility/Tooltip/Tooltip.component';
import { useTooltipModifiers } from '@/hooks';

import { containerStyles, importTooltip, leftContainerStyles } from './TableNavigation.css';
import type { ITableNavigation } from './types';

export const TableNavigation: React.FC<ITableNavigation> = ({
  breadCrumbsItems,
  onImportClick,
  onSettingsClick,
  leftHeader,
  children,
  testID,
  className,
}) => {
  const tooltipModifiers = useTooltipModifiers([{ name: 'offset', options: { offset: [0, 5] } }]);

  return (
    <Box className={clsx(containerStyles, className)} testID={testID} justify="space-between" align="center" px={24}>
      <Box gap={8} align="center" className={leftContainerStyles}>
        {breadCrumbsItems && <BreadCrumbs items={breadCrumbsItems} />}
        {leftHeader}
      </Box>
      <Box gap={8} mr={-8} pl={20}>
        {children}
        {onImportClick && (
          <Tooltip
            placement="bottom"
            className={importTooltip}
            modifiers={tooltipModifiers}
            referenceElement={({ ref, onOpen, onClose }) => (
              <SquareButton
                ref={ref}
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
                iconName="Import"
                size="medium"
                onClick={onImportClick}
              />
            )}
          >
            {() => <Text variant="caption">Import</Text>}
          </Tooltip>
        )}
        {onSettingsClick && <SquareButton iconName="Settings" size="medium" onClick={onSettingsClick} />}
      </Box>
    </Box>
  );
};
