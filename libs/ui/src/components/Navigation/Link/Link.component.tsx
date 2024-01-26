import { clsx } from '@bync/style';

import { forwardRef } from '@/hocs';

import { Text } from '../../Text';
import { inline, linkRecipe, textOverrideStyles } from './Link.css';
import * as LinkTheme from './LinkTheme.css';
import type { ILink } from './types';

export const Link = forwardRef<HTMLParagraphElement, ILink>('Link')(
  (
    {
      size = 'medium',
      label,
      weight,
      theme = 'light',
      disabled = false,
      testID,
      isActive,
      variant,
      overflow,
      className,
      ...props
    },
    ref
  ) => {
    const styles = linkRecipe({ size, variant, overflow, isActive, disabled });

    const href = disabled ? undefined : props.href;
    const onClick = disabled ? undefined : props.onClick;

    return (
      <a
        {...props}
        href={href}
        onClick={onClick}
        className={clsx(LinkTheme[theme], styles, className, { [inline]: props.inline })}
        data-testid={testID}
      >
        <Text ref={ref} weight={weight} overflow={overflow} className={textOverrideStyles}>
          {label}
        </Text>
      </a>
    );
  }
);
