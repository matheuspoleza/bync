import React from 'react';

import { setComponentDisplayName } from '@/utils/component.util';

interface IForwardRef {
  <T>(name: string): <C extends (props: any, ref: React.ForwardedRef<T>) => React.ReactElement | null>(render: C) => C;

  <T, P extends object | void>(name: string): (
    render: React.ForwardRefRenderFunction<T, P>
  ) => React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;
}

export const forwardRef: IForwardRef = (name: string) => (render: React.ForwardRefRenderFunction<any, any>) =>
  setComponentDisplayName(React.forwardRef(render), name) as any;
