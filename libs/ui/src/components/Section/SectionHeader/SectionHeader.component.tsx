import { clsx, type VariantProps } from '@bync/style';

import { Text } from '@/components/Text';
import type { IBoxPaddingProps } from '@/components/Utility';
import { Box } from '@/components/Utility';
import type { BaseProps } from '@/types';

import { headerRecipe, titleStyles } from './SectionHeader.css';
import * as SectionHeaderTheme from './SectionHeaderTheme.css';

export interface ISectionHeader
  extends BaseProps,
    IBoxPaddingProps,
    Omit<React.ComponentPropsWithoutRef<'header'>, 'title'>,
    VariantProps<typeof headerRecipe> {
  /**
   * @description since the styling is complex, we allow access to className which applies it to a passed element
   * @example (class: string) => (<Text className={class}>Title</Text>
   */
  title: string | ((className: string) => React.ReactNode);
  theme?: 'light' | 'dark';
  onHeaderClick?: () => void;
  primaryContent?: JSX.Element;
}

export const SectionHeader: React.FC<ISectionHeader> = ({
  title,
  onHeaderClick,
  variant = 'basic',
  theme = 'light',
  children,
  primaryContent,
  testID,
  ...props
}) => {
  const isDisabled = variant === 'disabled';
  const isTitleString = typeof title === 'string';

  return (
    <Box
      {...props}
      as="header"
      align="center"
      testID={`${testID}--section-header`}
      justify="space-between"
      onClick={() => !isDisabled && onHeaderClick?.()}
      className={clsx(SectionHeaderTheme[theme], headerRecipe({ variant, canClick: !!onHeaderClick && !isDisabled }))}
    >
      <Box align="center">
        {isTitleString ? (
          <Text className={titleStyles} testID={`${testID}--section-header-title`}>
            {title}
          </Text>
        ) : (
          title(titleStyles)
        )}

        {primaryContent}
      </Box>

      <Box gap={8} align="center" justify="end">
        {children}
      </Box>
    </Box>
  );
};
