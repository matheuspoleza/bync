import { clsx } from '@bync/style';

import { Icon } from '@/components/Media/Icon';
import { Box } from '@/components/Utility/Box/Box.component';

import type { IPrimaryNavigationItem } from '../types';
import { menuItemStyle } from './PrimaryNavigationItem.css';

export const PrimaryNavigationItem: React.FC<IPrimaryNavigationItem> = ({
  iconName,
  onClick,
  isActive = false,
  testID,
  className,
  iconProps = { viewBox: '4 4 16 16' },
  renderIcon,
}) => {
  const stylesForMenuItem = menuItemStyle({ isActive });

  return (
    <Box
      onClick={onClick}
      testID={testID}
      justify="center"
      align="center"
      className={clsx(stylesForMenuItem, className)}
    >
      {renderIcon && renderIcon()}
      {!renderIcon && <Icon name={iconName} {...iconProps} />}
    </Box>
  );
};
