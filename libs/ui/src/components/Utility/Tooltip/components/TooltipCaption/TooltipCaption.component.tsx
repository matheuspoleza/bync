import { clsx } from '@bync/style';

import type { IText } from '@/components/Text';
import { Text } from '@/components/Text';
import type { IBox } from '@/components/Utility/Box';
import { Box } from '@/components/Utility/Box';

import { captionStyles } from './TooltipCaption.css';

export const TooltipCaption: React.FC<IText & { mb?: IBox['mb'] }> = ({ className, children, mb = 6, ...props }) => {
  return (
    <Box mb={mb}>
      <Text {...props} variant="caption" className={clsx(className, captionStyles)}>
        {children}
      </Text>
    </Box>
  );
};
