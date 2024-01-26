import { assignInlineVars, clsx } from '@bync/style';

import type { IBox } from '@/components/Utility';
import { Box } from '@/components/Utility';
import type { BaseProps } from '@/types';

import { containerStyles, widthVar } from './ModalContainer.css';

export interface IModalContainer extends BaseProps, IBox {
  width?: string;
}

export const ModalContainer: React.FC<IModalContainer> = ({
  testID,
  children,
  className,
  width = '360px',
  ...props
}) => {
  return (
    <Box
      testID={testID}
      className={clsx(containerStyles, className)}
      direction="column"
      {...props}
      style={{ ...assignInlineVars({ [widthVar]: width }), ...props.style }}
    >
      {children}
    </Box>
  );
};
