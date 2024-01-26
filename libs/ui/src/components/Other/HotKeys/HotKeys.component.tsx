import { clsx } from '@bync/style';

import { Icon } from '@/components/Media/Icon';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';

import { colorVariants, iconStyle, labelStyles } from './HotKeys.css';
import type { IHotKeys } from './types';

export const HotKeys: React.FC<IHotKeys> = ({ hotKeys, variant = 'light', testID }) => {
  const colorModifier = colorVariants({ variant });
  return (
    <Box testID={testID}>
      {hotKeys.map((hotKey, index) => (
        <span key={index}>
          {hotKey.iconName && (
            <div className={clsx(iconStyle, colorModifier)}>
              <Icon name={hotKey.iconName} height={24} width={24} />
            </div>
          )}
          {hotKey.label && (
            <Text variant="caption" className={clsx(labelStyles, colorModifier)}>
              {hotKey.label}
            </Text>
          )}
        </span>
      ))}
    </Box>
  );
};
