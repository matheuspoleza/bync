/* eslint-disable no-return-assign */
import { clsx } from '@bync/style';
import { Fragment, useEffect, useRef, useState } from 'react';

import { AddTab } from './AddTab';
import { Tab } from './Tab';
import { activeBlock, addButton, tabGroupContainer, tabWrapperRecipe } from './TabGroup.css';
import type { ITabGroup } from './types';

export const TabGroup: React.FC<ITabGroup> = ({
  tabs,
  hasDividers,
  activeTab,
  onChange,
  size = 'default',
  width = 'hug',
  testID,
  hasAddButton,
  onAddButtonClick,
  className,
}) => {
  const elementRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [selectorStyles, setSelectorStyles] = useState({
    offsetWidth: 0,
    offsetLeft: 0,
  });

  const highlightActiveTab = () => {
    elementRefs.current.forEach((ref, index) => {
      if (ref && index === activeTab) {
        const { offsetLeft, offsetWidth } = ref;
        setSelectorStyles({
          offsetWidth,
          offsetLeft,
        });
      }
    });
  };

  useEffect(() => {
    highlightActiveTab();
  }, [activeTab]);

  const tabElements = tabs.map((tab, index) => {
    const isLastTab = index === tabs.length - 1;
    const isActiveTabOrPreviousTab = index !== activeTab && index !== activeTab - 1;
    const shouldShowDivider = hasDividers && !isLastTab && isActiveTabOrPreviousTab;

    const shouldContainAddButton = hasAddButton && isLastTab;
    const styles = tabWrapperRecipe({ showDivider: shouldShowDivider, width });
    const tabTestID = `${testID}--tab-${index}`;
    return (
      <Fragment key={index}>
        <span className={styles} ref={(ref) => (elementRefs.current[index] = ref)}>
          <Tab
            {...tab}
            index={index}
            isActive={activeTab === index}
            onChange={onChange}
            width={width}
            testID={tabTestID}
          />
        </span>
        {shouldContainAddButton && (
          <span className={clsx(styles, addButton)}>
            <AddTab size={size} onClick={onAddButtonClick} testID={`${testID}--tab-${index + 1}`} width={width} />
          </span>
        )}
      </Fragment>
    );
  });

  return (
    <ul className={clsx(className, tabGroupContainer({ size, width }))} data-testid={testID}>
      {tabElements}
      {selectorStyles.offsetLeft !== 0 && selectorStyles.offsetWidth !== 0 && (
        <span className={activeBlock} style={{ width: selectorStyles.offsetWidth, left: selectorStyles.offsetLeft }} />
      )}
    </ul>
  );
};
