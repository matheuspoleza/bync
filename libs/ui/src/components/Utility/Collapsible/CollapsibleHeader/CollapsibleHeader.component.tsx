import { clsx } from '@bync/style';

import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';
import { Tokens } from '@/styles';

import { captionStyles, headerChildrenStyles, headerRecipe, labelModifier } from './CollapsibleHeader.css';
import type { ICollapsibleHeader } from './types';

export const CollapsibleHeader: React.FC<ICollapsibleHeader> = ({
  label,
  caption,
  isOpen,
  isEmpty,
  isDisabled,
  className,
  isSection = false,
  testID,
  children,
}) => {
  const labelClassName = labelModifier({ isEmpty: isEmpty && !isOpen, isDisabled });
  const headerStyle = headerRecipe({ isSection, isOpen, isDisabled });

  return (
    <Box
      align="center"
      justify="space-between"
      pt={11}
      pb={isOpen ? 7 : 11}
      pr={16}
      pl={24}
      data-testid={testID}
      className={clsx(className, headerStyle)}
    >
      <Text weight="semiBold" className={labelClassName}>
        {label}
      </Text>
      <Box align="center">
        <Text
          variant="caption"
          className={captionStyles}
          color={isDisabled ? Tokens.colors.neutralLight.neutralsLight600 : Tokens.colors.neutralDark.neutralsDark100}
        >
          {caption}
        </Text>
        <div>
          {children?.({
            isOpen,
            headerChildrenStyles: headerChildrenStyles({ isEmpty: isEmpty && !isOpen, isDisabled }),
          })}
        </div>
      </Box>
    </Box>
  );
};
