import { TableItem, TableSorterOptions } from '@bync/ui';

interface Item extends TableItem {
  name: string;
  group?: boolean;
}

export const withGroupsOrder =
  <L extends Item, R extends Item>(orderItems: (left: L, right: R) => number) =>
  (left: L | R, right: L | R, options: TableSorterOptions) => {
    if (left.group && right.group) return right.name.localeCompare(left.name);
    if (left.group || right.group)
      return (left.group ? 1 : -1) * (options.descending ? 1 : -1);

    return orderItems(left as any, right as any);
  };
