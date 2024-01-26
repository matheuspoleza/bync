import { assignInlineVars, clsx } from '@bync/style';

import { forwardRef } from '@/hocs';

import {
  boxRecipe,
  gapVar,
  growVar,
  heightVar,
  marginVar,
  maxHeightVar,
  maxWidthVar,
  minHeightVar,
  minWidthVar,
  paddingVar,
  shrinkVar,
  widthVar,
} from './Box.css';
import type { IBox } from './types';
import { getInlineSpacing, toPX } from './utils';

export const Box = forwardRef<HTMLDivElement, IBox>('Box')(
  (
    {
      children,
      alignSelf,
      className,
      justify,
      direction = 'row',
      wrap = 'nowrap',
      width,
      height,
      inline = false,
      align,
      grow,
      gap,
      shrink,
      style,
      testID,
      as: Tag = 'div',
      mx,
      my,
      px,
      py,
      mt,
      mr,
      mb,
      ml,
      pt,
      pr,
      pb,
      pl,
      overflow,
      minWidth,
      maxWidth,
      maxHeight,
      minHeight,
      overflowY,
      overflowX,
      ...props
    },
    ref
  ) => {
    const boxStyles = boxRecipe({ justify, direction, align, wrap, inline, alignSelf, overflow, overflowY, overflowX });

    const dynamicStyles = assignInlineVars({
      [gapVar]: toPX(gap),
      [growVar]: String(grow ?? ''),
      [widthVar]: toPX(width),
      [heightVar]: toPX(height),
      [marginVar]: getInlineSpacing(mt ?? my, mr ?? mx, mb ?? my, ml ?? mx),
      [shrinkVar]: String(shrink ?? ''),
      [paddingVar]: getInlineSpacing(pt ?? py, pr ?? px, pb ?? py, pl ?? px),
      [minWidthVar]: toPX(minWidth),
      [maxWidthVar]: toPX(maxWidth),
      [minHeightVar]: toPX(minHeight),
      [maxHeightVar]: toPX(maxHeight),
    });

    return (
      <Tag
        {...props}
        ref={ref}
        style={{ ...dynamicStyles, ...style }}
        className={clsx(boxStyles, className)}
        data-testid={testID}
      >
        {children}
      </Tag>
    );
  }
);
