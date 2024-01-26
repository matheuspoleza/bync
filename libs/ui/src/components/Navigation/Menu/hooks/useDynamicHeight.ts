/* eslint-disable no-param-reassign */
import { useLayoutEffect } from 'react';

export const useDynamicHeight = (
  listRef: React.RefObject<HTMLDivElement>,
  maxHeightProp?: React.CSSProperties['maxHeight'],
  numberOfItemsToShow = 8
) => {
  useLayoutEffect(() => {
    if (!listRef.current) return;

    if (maxHeightProp) {
      listRef.current.style.maxHeight = typeof maxHeightProp === 'number' ? `${maxHeightProp}px` : maxHeightProp;

      return;
    }

    const maxHeight = Array.from(listRef.current.children)
      .slice(0, numberOfItemsToShow)
      .reduce((height, menuItem) => height + menuItem.getBoundingClientRect().height, 8);

    if (maxHeight < listRef.current.scrollHeight && listRef.current.children.length > numberOfItemsToShow) {
      const lastVisibleItem = listRef.current.children[numberOfItemsToShow - 1];
      const halfItemHeight = Math.ceil(lastVisibleItem.getBoundingClientRect().height / 2);

      listRef.current.style.maxHeight = `${maxHeight + halfItemHeight - 4}px`;
    } else {
      listRef.current.style.maxHeight = `${maxHeight}px`;
    }
  }, [maxHeightProp, numberOfItemsToShow]);
};
