import { clsx } from '@bync/style';

import { SquareButton } from '@/components/Buttons/SquareButton';
import { Link } from '@/components/Navigation/Link';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';

import {
  baseLabelStyles,
  closeButtonStyles,
  dividerContainer,
  dividerStyle,
  labelStyles,
  linkContainer,
} from './Divider.css';
import type { IDivider } from './types';

export const Divider: React.FC<IDivider> = ({
  label,
  line = true,
  centeredLabel = false,
  dashed,
  breakDivider,
  onLabelClick,
  onCloseClick,
  dark,
  thick,
  fullWidth = true,
  noPadding = false,
  className,
}) => {
  const dividerClassName = dividerStyle({ line, centeredLabel, dashed, breakDivider, thick, dark });
  const labelClassName = labelStyles({ centeredLabel, breakDivider });

  const containerClassName = dividerContainer({ fullWidth, noPadding });

  return (
    <Box align="center" className={clsx(containerClassName, className)}>
      {label && (
        <>
          {centeredLabel && <span className={dividerClassName} />}
          {onLabelClick ? (
            <Link
              weight="semiBold"
              size="small"
              label={label}
              onClick={onLabelClick}
              className={clsx(linkContainer, baseLabelStyles)}
            />
          ) : (
            <Text variant="caption" weight="semiBold" className={clsx(baseLabelStyles, labelClassName)}>
              {label}
            </Text>
          )}
        </>
      )}
      <span className={dividerClassName} />
      {onCloseClick && (
        <SquareButton size="small" className={closeButtonStyles} iconName="CloseM" onClick={onCloseClick} />
      )}
    </Box>
  );
};
