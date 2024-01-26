import type { RefObject } from 'react';
import { useEffect } from 'react';

export const useOutsideClickHandler = (
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      // Check if the event target is a descendant of the ref element
      const isDescendant = ref.current.contains(event.target as Node);

      // Check if the event target is a descendant of the ref element being interacted with
      const isChildBeingInteractedWith = (event as MouseEvent).relatedTarget
        ? ref.current.contains((event as MouseEvent).relatedTarget as Node)
        : false;

      if (isDescendant || isChildBeingInteractedWith) {
        return;
      }

      handler(event);
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
};
