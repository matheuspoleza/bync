import { clsx } from '@bync/style';
import React, { useState } from 'react';
import { useCollapse } from 'react-collapsed';

import { Divider } from '@/components/Other/Divider/Divider.component';

import { containerRecipe, contentWrapperStyles, dividerModifier, headerWrapperStyles } from './Collapsible.css';
import type { ICollapsible } from './types';

const ANIMATION_DURATION = 100;

export const Collapsible: React.FC<ICollapsible> = ({
  header,
  children,
  isOpen,
  isEmpty,
  isDisabled,
  testID,
  showDivider = true,
  containerClassName,
  contentClassName,
  dividerClassName,
  isSection = false,
  noBottomPadding = false,
}) => {
  const [isExpanded, setExpanded] = useState(isOpen ?? false);

  const { getCollapseProps, getToggleProps } = useCollapse({
    isExpanded,
    duration: ANIMATION_DURATION,
    defaultExpanded: isOpen,
  });
  const headerElement = React.cloneElement(header, { isOpen: isExpanded, isEmpty, isSection });

  return (
    <div className={clsx(containerRecipe({ isDisabled }), containerClassName)} data-testid={testID}>
      <div
        {...getToggleProps({ onClick: () => setExpanded((prevExpanded) => !prevExpanded) })}
        data-testid={`${testID}--header`}
        className={headerWrapperStyles({ isDisabled })}
      >
        {headerElement}
      </div>
      <section {...getCollapseProps()}>
        <div className={clsx(contentWrapperStyles, contentClassName)}>
          {typeof children === 'function' ? children(isExpanded) : children}
        </div>
      </section>
      {showDivider && (
        <Divider
          className={clsx(
            dividerModifier({ isOpen: isExpanded && (!!children || !isEmpty), isSection, noBottomPadding }),
            dividerClassName
          )}
        />
      )}
    </div>
  );
};
