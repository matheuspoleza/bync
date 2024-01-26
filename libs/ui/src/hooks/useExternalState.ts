import { useEffect, useState } from 'react';

export const useExternalState = <T>(externalState: T) => {
  const [state, setState] = useState(externalState);

  useEffect(() => setState(externalState), [externalState]);

  return [state, setState] as const;
};
