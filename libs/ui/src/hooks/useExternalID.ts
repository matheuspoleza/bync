import { useId } from 'react';

export const useExternalID = (overrideID?: string | undefined) => {
  const generatedID = useId();

  return overrideID ?? generatedID;
};
