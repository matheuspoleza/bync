import { style } from '@bync/style';

import { headerVariants } from '../../SectionHeader.css';
import * as SectionHeaderTheme from '../../SectionHeaderTheme.css';

export const sectionButtonStyles = style({
  color: SectionHeaderTheme.contract.color.button.default,

  selectors: {
    [`${headerVariants.basic}:hover &`]: {
      color: SectionHeaderTheme.contract.color.button.hover,
    },
    [`${headerVariants.disabled} &`]: {
      color: SectionHeaderTheme.contract.color.button.disabled,
    },
  },
});
