import type { IconName } from '@bync/icons';
import { clsx } from '@bync/style';

import { Icon } from '@/components/Media/Icon';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';

import {
  centerStyles,
  iconStyles,
  leftHandSideStyles,
  mapperContainer,
  rightHandSideStyles,
  textStyles,
} from './Mapper.css';
import type { IMapper } from './types';

const equalityIcons: Record<string, IconName> = {
  equal: 'Equals',
  arrow: 'ArrowRight',
};

const isStringOrNumber = (value: React.ReactNode): value is string | number =>
  typeof value === 'string' || typeof value === 'number';

export const Mapper: React.FC<IMapper> = ({ className, testID, equalityIcon, leftHandSide, rightHandSide }) => {
  const icon = equalityIcon && equalityIcons[equalityIcon];
  const leftHandSideElement = isStringOrNumber(leftHandSide) ? (
    <Text className={textStyles}>{leftHandSide}</Text>
  ) : (
    leftHandSide
  );
  const rightHandSideElement = isStringOrNumber(rightHandSide) ? (
    <Text className={textStyles}>{rightHandSide}</Text>
  ) : (
    rightHandSide
  );

  return (
    <Box className={clsx(className, mapperContainer)} data-testid={testID}>
      <Box className={leftHandSideStyles}>{leftHandSideElement}</Box>

      <Box className={centerStyles}>{icon && <Icon className={iconStyles} name={icon} />}</Box>

      <Box className={rightHandSideStyles}>{rightHandSideElement}</Box>
    </Box>
  );
};
