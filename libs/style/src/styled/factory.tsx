import { clsx } from 'clsx';
import { createElement } from 'react';

import { useTheme } from '../ThemeContext';
import { STYLED_CLASS } from './constants';
import type {
  DynamicOptions,
  FirstStyledArgument,
  SecondStyledArgument,
  StyledComponent,
  StyledComponentProps,
  StyledFactory,
} from './types';
import { getDynamicOptions, getStaticClass, useDynamicClass, useInlineStyle } from './utils';

export const styled = new Proxy<{
  [Tag in keyof JSX.IntrinsicElements]: StyledFactory<Tag>;
}>({} as any, {
  get:
    <Tag extends keyof JSX.IntrinsicElements>(_target: unknown, tag: Tag): StyledFactory<Tag> =>
    (firstArg: FirstStyledArgument, secondArg?: SecondStyledArgument, thirdArg?: DynamicOptions) => {
      const staticClass = getStaticClass(firstArg, secondArg);
      const dynamicOptions = getDynamicOptions(secondArg, thirdArg);

      const StyledComponent = (props: StyledComponentProps<Tag, any, any, { variant?: any; variants?: any }>) => {
        const themeClass = useTheme();
        const dynamicClass = useDynamicClass(firstArg, props);
        const inlineStyle = useInlineStyle(props, dynamicOptions);

        return createElement(tag, {
          ...(props as React.ComponentPropsWithoutRef<Tag>),
          className: clsx(themeClass, staticClass, dynamicClass, props.className),
          style: { ...inlineStyle, ...props.style },
        });
      };

      return Object.assign(StyledComponent, { [STYLED_CLASS]: staticClass }) as StyledComponent<any>;
    },
});
