import React from 'react';
import { useFocused, useSelected } from 'slate-react';

import { SuggestionsMenu } from './SuggestionsMenu/SuggestionsMenu.component';
import type { BaseSuggestionsMenuItem } from './SuggestionsMenu/SuggestionsMenu.interface';
import type { ISuggestionsPopper } from './SuggestionsPopper.interface';

export const SuggestionsPopper = <T extends BaseSuggestionsMenuItem>(
  props: ISuggestionsPopper<T>
): React.ReactElement | null => {
  const isFocused = useFocused();
  const isElementSelected = useSelected();

  const isSelected = isFocused && isElementSelected && props.isSelected;

  return isSelected ? <SuggestionsMenu {...props} /> : null;
};
