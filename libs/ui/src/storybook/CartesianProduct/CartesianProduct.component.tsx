import { Fragment, useContext } from 'react';

import { Box } from '@/components';
import { DemoContext } from '@/contexts';

import type { IExample } from '../Example';
import { Example } from '../Example';
import { GroupTitle } from '../GroupTitle';

const COLUMNS_TO_BASIS = {
  1: 'all',
  2: 'half',
  3: 'third',
  4: 'quarter',
  5: 'fifth',
  6: 'sixth',
  8: 'eighth',
  10: 'tenth',
} satisfies Record<number, IExample['basis']>;

const getCombinationCount = (combinations: ComponentCartesianProps<any>) =>
  Object.values(combinations).reduce((acc, options) => acc * (options?.length ?? 1), 1);

export type ComponentCartesianProps<Props extends Record<string, any>> = Partial<{
  [K in keyof Props]: Props[K][];
}>;

export interface ICartesianProduct<Props extends Record<string, any>>
  extends Pick<IExample, 'center' | 'componentName'> {
  Component: React.FC<Props>;
  combinations: ComponentCartesianProps<Props>;
  columns?: keyof typeof COLUMNS_TO_BASIS;
  groupBy?: keyof Props;
  groupByLabels?: string[];
  isDark?: boolean | ((props: Props) => boolean);
  isHidden?: boolean | ((props: Props) => boolean);
}

export const CartesianProduct = <Props extends Record<string, any>>({
  combinations,
  columns = 1,
  groupBy,
  groupByLabels,
  ...props
}: ICartesianProduct<Props>) => {
  const isDemo = useContext(DemoContext);

  if (groupBy && combinations[groupBy]?.length) {
    const { [groupBy]: groupByValues, ...rest } = combinations;

    return (
      <>
        {groupByValues?.map((value, index) => (
          <Fragment key={index}>
            <GroupTitle
              group={groupByLabels?.[index] || String(groupBy)}
              value={groupByLabels ? undefined : value}
              count={getCombinationCount(rest)}
            />
            <CartesianProduct {...props} columns={columns} combinations={{ ...rest, [groupBy!]: [value] } as Props} />
          </Fragment>
        ))}
      </>
    );
  }

  const { Component, componentName, isDark, isHidden, center } = props;
  const isHiddenFn = typeof isHidden === 'function' ? isHidden : () => isHidden;
  const hasColumns = columns > 1;
  const isVisible = (permutation: Props) => !isHiddenFn(permutation);

  const permutations = Object.entries(combinations).reduce<ComponentCartesianProps<Props>[]>(
    (acc, [key, options]: [string, any[]]) =>
      options.reduce((variants, option) => {
        if (acc.length) {
          variants.push(...acc.map((combination) => ({ ...combination, [key]: option })));
        } else {
          variants.push({ [key]: option });
        }

        return variants;
      }, []),
    []
  ) as Props[];

  const isDarkFn = typeof isDark === 'function' ? isDark : () => isDark;

  return (
    <Box direction={hasColumns ? 'row' : 'column'} wrap={hasColumns ? 'wrap' : 'nowrap'}>
      {permutations.filter(isVisible).map((permutation, index) => {
        return (
          <Example
            componentName={componentName}
            details={permutation}
            variant={isDarkFn(permutation) ? 'dark' : 'light'}
            basis={COLUMNS_TO_BASIS[columns]}
            center={center}
            isDemo={isDemo}
            key={index}
          >
            <Component {...permutation} />
          </Example>
        );
      })}
    </Box>
  );
};
