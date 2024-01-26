import { useRef, useState } from 'react';

/**
 * useful for setting state value from props when useLinkedState can't be used
 */
export const useSetValueOnChange = <Value>(value: Value, setValue: (value: Value) => void) => {
  const prevValueRef = useRef(value);

  if (prevValueRef.current !== value) {
    prevValueRef.current = value;
    setValue(value);
  }
};

/**
 * local state value that is reset when the external value changes
 */
export const useLinkedState = <Value>(propValue: Value) => {
  const [value, setValue] = useState(propValue);

  useSetValueOnChange(propValue, setValue);

  return [value, setValue] as const;
};
