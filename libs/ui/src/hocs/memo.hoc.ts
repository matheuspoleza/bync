import React from 'react';

import { setComponentDisplayName } from '@/utils/component.util';

interface IMemo {
  (name: string, propsAreEqual?: (prevProps: any, nextProps: any) => boolean): <
    C extends (...args: any[]) => React.ReactElement | null
  >(
    render: C
  ) => C;

  <P>(name: string, propsAreEqual?: (prevProps: any, nextProps: any) => boolean): (
    render: React.FC<P>
  ) => React.NamedExoticComponent<P>;
}

export const memo: IMemo =
  (name: string, propsAreEqual?: (prevProps: any, nextProps: any) => boolean) => (render: React.FC<any>) =>
    setComponentDisplayName(React.memo(render, propsAreEqual), name) as any;
