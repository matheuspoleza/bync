import { clsx } from '@bync/style';

import { forwardRef } from '@/hocs';

import { textStyles } from './Text.css';
import type { IText } from './types';
import { getHTMLElementByVariant } from './utils';

export const Text = forwardRef<HTMLParagraphElement, IText>('Text')(
  (
    { children, variant = 'basic', weight, underlined, className, testID, overflow, breakWord, as, color, ...props },
    ref
  ) => {
    if (!children) {
      return null;
    }

    const Tag = as ?? getHTMLElementByVariant(variant);

    return (
      <Tag
        {...props}
        style={{ color, ...props.style }}
        ref={ref}
        className={clsx(textStyles({ variant, underlined, weight, overflow, breakWord }), className)}
        data-testid={testID}
      >
        {children}
      </Tag>
    );
  }
);
