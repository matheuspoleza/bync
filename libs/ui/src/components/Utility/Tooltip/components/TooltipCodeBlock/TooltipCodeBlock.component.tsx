import { clsx } from '@bync/style';

import type { IText } from '@/components/Text';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';

import type { IPaddingUtility } from '../../Tooltip.interface';
import { lightBlockStyles } from './TooltipCodeBlock.css';

export type ITooltipCodeBlock = IText & IPaddingUtility;

export const TooltipCodeBlock: React.FC<ITooltipCodeBlock> = ({
  className,
  testID,
  children,
  pb,
  pl,
  pr,
  pt,
  px,
  py,
  ...props
}) => {
  return (
    <Box pt={pt} pb={pb} pr={pr} pl={pl} px={px} py={py}>
      <Text className={clsx(lightBlockStyles, className)} testID={testID} variant="p" {...props}>
        {children}
      </Text>
    </Box>
  );
};
