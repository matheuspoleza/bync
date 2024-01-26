import { Icon } from '@/components/Media/Icon';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';

import type { ISecondaryNavigationItem } from '../types';
import { captionStyles, iconStyles, labelStyles, navigationItemTextRecipe } from './SecondaryNavigationtem.css';

export const SecondaryNavigationItem: React.FC<ISecondaryNavigationItem> = ({
  variant = 'default',
  label = '',
  caption = '',
  icon,
  onClick,
  isActive,
  testID,
}) => {
  const stylesForSecondaryNavigationItem = navigationItemTextRecipe({
    variant,
    isActive,
  });

  return (
    <Box align="center" className={stylesForSecondaryNavigationItem} onClick={onClick} testID={testID}>
      <Icon className={iconStyles} name={icon} height={24} width={24} />
      <Text variant="basic" className={labelStyles}>
        {label}
      </Text>
      <Text variant="caption" className={captionStyles}>
        {caption}
      </Text>
    </Box>
  );
};
