import { assignInlineVars } from '@bync/style';
import { useMemo } from 'react';

import { Box } from '../Box';
import { Popper } from '../Popper/Popper.component';
import { TooltipArrow } from './components/TooltipArrow';
import { TOOLTIP_DEFAULT_MODIFIERS } from './Tooltip.constant';
import { arrowContainerRecipe, bottomOffsetVar, leftOffsetVar, rightOffsetVar, tooltipRecipe } from './Tooltip.css';
import type { ITooltip } from './Tooltip.interface';
import { getArrowOffset, getArrowOrientation, getPaddings } from './Tooltip.util';

export const Tooltip: React.FC<ITooltip> = ({
  pl,
  pr,
  pt,
  pb,
  px,
  py,
  size = 'default',
  width,
  height,
  testID,
  variant = 'basic',
  hasArrow = true,
  children,
  placement = 'auto',
  className,
  modifiers = TOOLTIP_DEFAULT_MODIFIERS,
  hasArrowShift,
  disableLayers = true,
  tooltipClassName,
  ...props
}) => {
  const orientation = getArrowOrientation(placement);

  const tooltipStyles = tooltipRecipe({ variant });

  const arrowContainerStyles = arrowContainerRecipe({ orientation });
  const paddings = getPaddings(size, { pb, pl, pr, pt, px, py });

  const variables = assignInlineVars({
    [leftOffsetVar]: `${paddings.pl}px`,
    [rightOffsetVar]: `${paddings.pr}px`,
    [bottomOffsetVar]: `${paddings.pb}px`,
  });

  const enhancedModifiers = useMemo(() => {
    if (!hasArrowShift) return modifiers;

    const givenOffset = modifiers.find((modifier) => modifier.name === 'offset');
    const shiftedOffset = getArrowOffset(orientation, (givenOffset!.options! as any).offset);
    const enhancedOffset = {
      ...givenOffset,
      options: {
        offset: shiftedOffset,
      },
    };

    return [...modifiers.filter((m) => m.name !== 'offset'), enhancedOffset];
  }, [modifiers, hasArrowShift, orientation]);

  const maxSize =
    width || height
      ? {
          overflow: 'auto',
          width: width ? `${width}px` : 'unset',
          height: height ? `${height}px` : 'unset',
        }
      : {};

  return (
    <Popper
      {...props}
      testID={`${testID}--tooltip`}
      className={className}
      placement={placement}
      modifiers={enhancedModifiers}
      disableLayers={disableLayers}
      arrowClassName={arrowContainerStyles}
      arrow={hasArrow && <TooltipArrow variant={variant} orientation={orientation} className={tooltipClassName} />}
    >
      {(childProps) => (
        <Box
          style={{ ...maxSize, ...variables }}
          testID={`${testID}--tooltip-inner-box`}
          direction="column"
          className={tooltipStyles}
          {...paddings}
        >
          {children(childProps)}
        </Box>
      )}
    </Popper>
  );
};
