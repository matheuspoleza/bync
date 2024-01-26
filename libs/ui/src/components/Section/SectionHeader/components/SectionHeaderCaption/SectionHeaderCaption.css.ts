import { style } from '@bync/style';

import { headerVariants } from '../../SectionHeader.css';
import * as SectionHeaderTheme from '../../SectionHeaderTheme.css';

export const captionStyles = style({
  color: SectionHeaderTheme.contract.color.caption.default,
  pointerEvents: 'none',

  selectors: {
    [`${headerVariants.basic}:hover &`]: {
      color: SectionHeaderTheme.contract.color.caption.hover,
    },
    [`${headerVariants.disabled} &, ${headerVariants.disabled}:hover &`]: {
      color: SectionHeaderTheme.contract.color.caption.disabled,
    },
  },
});
