import { Box } from '@/components/Utility/Box';
import type { BaseProps } from '@/types';

import { boxStyles } from './ModalFooter.css';

export interface IModalFooter extends BaseProps, React.ComponentPropsWithoutRef<'div'> {
  checkbox?: React.ReactNode;
}

export const ModalFooter: React.FC<IModalFooter> = ({ children, checkbox, testID, ...props }) => {
  return (
    <Box
      justify={checkbox ? 'space-between' : 'end'}
      align="center"
      className={boxStyles}
      px={24}
      py={20}
      testID={`${testID}--modal-footer`}
      {...props}
    >
      {checkbox}
      <Box gap={8}>{children}</Box>
    </Box>
  );
};
