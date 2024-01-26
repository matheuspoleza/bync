import { clsx } from '@bync/style';

import { baseLabelStyles, dividerStyle, labelStyles } from '@/components/Other/Divider/Divider.css';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';

import { dividerContainer } from './MenuDivider.css';
import type { IMenuDivider } from './types';

export const MenuDivider: React.FC<IMenuDivider> = ({
  label,
  line = true,
  dashed,
  breakDivider,
  thick,
  fullWidth = true,
  className,
}) => {
  const dividerClassName = dividerStyle({ line, dashed, breakDivider, thick });
  const labelClassName = labelStyles({ breakDivider, centeredLabel: false });
  const containerClassName = dividerContainer({ fullWidth, label: !!label });

  return (
    <Box align="center" className={clsx(containerClassName, className)}>
      {label && (
        <Text variant="caption" weight="semiBold" className={clsx(baseLabelStyles, labelClassName)}>
          {label}
        </Text>
      )}
      <span className={dividerClassName} />
    </Box>
  );
};
