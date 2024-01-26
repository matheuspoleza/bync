/* eslint-disable no-param-reassign */

import type { RefObject } from 'react';
import { useEffect } from 'react';

import type { ITextAreaAutoSize } from './AutoSize/types';

export const useAutosizeTextArea = (
  textAreaRef: RefObject<HTMLTextAreaElement> | null,
  value: ITextAreaAutoSize['value']
) => {
  useEffect(() => {
    if (textAreaRef?.current) {
      textAreaRef.current.style.height = '0px';
      const { scrollHeight } = textAreaRef.current;
      textAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [textAreaRef, value]);
};
