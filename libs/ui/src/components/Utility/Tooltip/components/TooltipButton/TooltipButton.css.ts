import { createVar, style } from '@bync/style';

import { font } from '@/styles/theme/components/link';

import { bottomOffsetVar, leftOffsetVar, rightOffsetVar } from '../../Tooltip.css';

const marginLeft = createVar();
const marginRight = createVar();
const marginBottom = createVar();

export const tooltipButtonStyles = style({
  vars: {
    [marginLeft]: `calc(${leftOffsetVar} * -1 + 4px)`,
    [marginRight]: `calc(${rightOffsetVar} * -1 + 4px)`,
    [marginBottom]: `calc(${bottomOffsetVar} * -1 + 4px)`,
  },
  marginLeft,
  marginRight,
  marginBottom,
  borderRadius: '4px',
  width: `calc(100% + ${marginLeft}px + ${marginRight}px)`,
  fontSize: font.size.small,
  height: '29px',
  lineHeight: '17px',
});
