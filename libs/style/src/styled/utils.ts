import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clsx } from 'clsx';
import { useMemo } from 'react';

import { STYLED_CLASS } from './constants';
import type {
  DynamicOptions,
  FirstStyledArgument,
  SecondStyledArgument,
  StyledComponentProps,
  ThemeContract,
} from './types';

export const getStaticClass = (firstArg: FirstStyledArgument, secondArg?: SecondStyledArgument): string | null => {
  // eslint-disable-next-line no-nested-ternary
  const classNames = (Array.isArray(firstArg) ? firstArg : Array.isArray(secondArg) ? secondArg : []).map((source) =>
    typeof source === 'string' ? source : source[STYLED_CLASS]
  );

  return classNames.length ? clsx(classNames) : null;
};

export const getDynamicOptions = (secondArg?: SecondStyledArgument, thirdArg?: DynamicOptions): DynamicOptions | null =>
  (Array.isArray(secondArg) ? thirdArg : secondArg) ?? null;

export const useDynamicClass = (
  firstArg: FirstStyledArgument<any>,
  props: { variant?: string; variants?: Record<string, any> }
) =>
  useMemo(() => {
    if (typeof firstArg === 'function') return firstArg(props.variants);
    if (Array.isArray(firstArg) || !props.variant) return null;

    return firstArg[props.variant];
  }, [firstArg, props.variants, props.variant]);

export const useInlineStyle = (
  props: StyledComponentProps<keyof JSX.IntrinsicElements, ThemeContract, Record<string, string>>,
  dynamicOptions: DynamicOptions | null
) => {
  const { theme, vars } = dynamicOptions ?? {};

  return useMemo(() => {
    const style = {};

    if (theme && props.theme) {
      Object.assign(style, assignInlineVars(theme, props.theme));
    }

    if (vars && props.vars) {
      Object.assign(style, assignInlineVars(props.vars as Record<string, string>));
    }

    return style;
  }, [props.theme, props.vars]);
};
