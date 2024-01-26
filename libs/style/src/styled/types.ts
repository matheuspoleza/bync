/* eslint-disable @typescript-eslint/ban-types */
import type { assignInlineVars } from '@vanilla-extract/dynamic';
import type { RecipeVariants, RuntimeFn } from '@vanilla-extract/recipes';

import type { STYLED_CLASS } from './constants';

export type ThemeContract = Parameters<typeof assignInlineVars>[0];

export interface DynamicOptions<
  Theme extends ThemeContract | null = ThemeContract,
  Variables extends Record<string, string> | null = Record<string, string>
> {
  /**
   * the contract for a theme that can be overridden via a `theme` prop
   */
  theme?: Theme;
  /**
   * variables that can be overridden via a `vars` prop
   */
  vars?: Variables;
}

export type DynamicThemeProps<Theme> = Theme extends ThemeContract
  ? {
      /**
       * inline override for the theme used to style this component
       */
      theme?: Parameters<typeof assignInlineVars<Theme>>[1];
    }
  : {};

export type DynamicVariablesProps<Variables> = Variables extends Record<string, string>
  ? {
      /**
       * inline override for variables used to styled this component
       */
      vars?: Partial<{ [K in keyof Variables]: string }>;
    }
  : {};

export type StyledComponentProps<
  Tag extends keyof JSX.IntrinsicElements,
  Theme,
  Variables,
  Extras extends object = {}
> = React.ComponentPropsWithoutRef<Tag> & DynamicThemeProps<Theme> & DynamicVariablesProps<Variables> & Extras;

export interface StyledComponent<Props = {}> extends React.FunctionComponent<Props> {
  (props: Props, context?: any): React.ReactElement<any, any> | null;
  [STYLED_CLASS]: string | null;
}

export type StyleSource = StyledComponent | string;

export interface StyledFactory<Tag extends keyof JSX.IntrinsicElements> {
  <
    Recipe extends RuntimeFn<Record<string, any>>,
    Theme extends ThemeContract | null = null,
    Variables extends Record<string, string> | null = null
  >(
    recipe: Recipe,
    sources?: StyleSource[],
    dynamic?: DynamicOptions<Theme, Variables>
  ): StyledComponent<StyledComponentProps<Tag, Theme, Variables, { variants: RecipeVariants<Recipe> }>>;

  <
    Variant extends string,
    Theme extends ThemeContract | null = null,
    Variables extends Record<string, string> | null = null
  >(
    variants: Record<Variant, string>,
    sources?: StyleSource[],
    dynamic?: DynamicOptions<Theme, Variables>
  ): StyledComponent<StyledComponentProps<Tag, Theme, Variables, { variant: Variant }>>;

  <Theme extends ThemeContract | null = null, Variables extends Record<string, string> | null = null>(
    sources: StyleSource[],
    dynamic?: DynamicOptions<Theme, Variables>
  ): StyledComponent<StyledComponentProps<Tag, Theme, Variables>>;
}

export type FirstStyledArgument<Variants extends {} = any> =
  | RuntimeFn<Variants>
  | Record<string, string>
  | StyleSource[];

export type SecondStyledArgument = StyleSource[] | DynamicOptions;
