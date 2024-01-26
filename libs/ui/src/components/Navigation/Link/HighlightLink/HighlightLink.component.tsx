import { clsx } from '@bync/style';

import { Text } from '@/components/Text';
import { forwardRef } from '@/hocs';

import { inline, linkRecipe, textOverrideStyles } from '../Link.css';
import type { IHighlightLink } from './HighlightLink.interface';

export const HighLightLink = forwardRef<HTMLParagraphElement, IHighlightLink>('Link')(
  ({ size = 'medium', label, highlight, weight, testID, isActive, variant, overflow, className, ...props }, ref) => {
    const styles = linkRecipe({ size, variant, overflow, isActive });

    return (
      <a {...props} className={clsx(styles, className, { [inline]: props.inline })} data-testid={testID}>
        <Text.Highlighted
          text={label}
          highlight={highlight}
          ref={ref}
          weight={weight}
          overflow={overflow}
          className={textOverrideStyles}
        />
      </a>
    );
  }
);
