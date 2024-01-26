import { useRef } from 'react';

import { usePersistFunction } from './usePersistFunction';

export const useDocumentCursor = () => {
  const ref = useRef<string>();

  const set = usePersistFunction((cursor: string) => {
    const documentCursor = document.body.style.cursor;

    if (documentCursor === cursor) return;

    ref.current = documentCursor;
    document.body.style.cursor = cursor;
  });

  const reset = usePersistFunction(() => {
    document.body.style.cursor = ref.current ?? 'auto';
  });

  return {
    ref,
    set,
    reset,
  };
};
