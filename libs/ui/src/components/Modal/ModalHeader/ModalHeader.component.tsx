import { clsx } from '@bync/style';

import { SquareButton } from '@/components/Buttons/SquareButton';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';
import type { BaseProps } from '@/types';

import { boxStyles, regularStyles } from './ModalHeader.css';

export interface IModalHeader extends BaseProps, React.ComponentPropsWithoutRef<'header'> {
  title: string;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  variant?: 'basic' | 'bold';
  leftButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
}

export const ModalHeader: React.FC<IModalHeader> = ({
  onClose,
  title,
  variant = 'basic',
  secondaryButton,
  leftButton,
  testID,
  ...props
}) => {
  const isBold = variant === 'bold';

  return (
    <Box
      as="header"
      align="center"
      justify="space-between"
      className={boxStyles}
      py={8}
      pr={12}
      pl={leftButton ? 16 : 24}
      testID={`${testID}--modal-header`}
      {...props}
    >
      <Box align="center">
        {leftButton}
        <Text
          variant={isBold ? 'h3' : 'basic'}
          className={clsx({ [regularStyles]: !isBold })}
          testID={`${testID}--modal-title`}
        >
          {title}
        </Text>
      </Box>
      <Box gap={4}>
        {secondaryButton}
        <SquareButton iconName="CloseM" onClick={onClose} testID={`${testID}--close-button`} />
      </Box>
    </Box>
  );
};
