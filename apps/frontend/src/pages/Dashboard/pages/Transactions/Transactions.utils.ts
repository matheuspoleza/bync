import { TableSorterOptions } from '@bync/ui';
import type { TableGroupItemExample, TableItemExample } from './__fixtures__';

export const withGroupsOrder =
  (orderItems: (left: TableItemExample, right: TableItemExample) => number) =>
  (
    left: TableItemExample | TableGroupItemExample,
    right: TableItemExample | TableGroupItemExample,
    options: TableSorterOptions
  ) => {
    if (left.group && right.group) return right.name.localeCompare(left.name);
    if (left.group || right.group)
      return (left.group ? 1 : -1) * (options.descending ? 1 : -1);

    return orderItems(left, right);
  };
