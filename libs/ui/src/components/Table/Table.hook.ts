import { type Atom, atom, useAtomValue, useSetAtom, useStore } from 'jotai';
import { useMolecule } from 'jotai-molecules';
import { useCallback, useContext, useEffect, useMemo } from 'react';

import { usePersistFunction } from '@/hooks';

import { TableStateMolecule } from './Table.atom';
import type { ITableContext } from './Table.context';
import { TableContext } from './Table.context';
import type { TableConfig, TableItem, TableSorterOptions, TableState } from './Table.interface';

export const useTable = <ColumnType extends string, Item extends TableItem, SortContext = unknown>() =>
  useContext(TableContext) as ITableContext<ColumnType, Item, SortContext>;

export const useTableStateMolecule = <ColumnType extends string, SortContext = unknown>() =>
  useMolecule(TableStateMolecule) as TableState<ColumnType, SortContext>;

export const useTableOrderedItems = <ColumnType extends string, Item extends TableItem, SortContext = unknown>({
  config,
  itemsAtom,
}: {
  config: TableConfig<ColumnType, Item, SortContext>;
  itemsAtom: Atom<Atom<Item>[]>;
}) => {
  const stateMolecule = useTableStateMolecule<ColumnType, SortContext>();

  const orderedItemsAtom = useMemo(
    () =>
      atom((get) => {
        const items = get(itemsAtom);
        const context = get(stateMolecule.sortContext);
        const orderBy = get(stateMolecule.orderBy);
        const descending = get(stateMolecule.descending);

        if (!orderBy) return items;

        const { sorter } = config.columns[orderBy];

        if (!sorter) return items;

        const options = { descending, context } as TableSorterOptions<SortContext>;

        const orderedItems = [...items].sort((left, right) => sorter(get(left), get(right), options));

        return descending ? orderedItems.reverse() : orderedItems;
      }),
    [itemsAtom, stateMolecule]
  );

  return useAtomValue(orderedItemsAtom);
};

export const useTableOnToggleSelectedItem = <ColumnName extends string>(
  stateMolecule: TableState<ColumnName, unknown>,
  id: string
) => {
  const setSelectedIDs = useSetAtom(stateMolecule.selectedIDs);

  return useCallback(() => {
    setSelectedIDs((prev) => {
      if (prev.has(id)) {
        prev.delete(id);
      } else {
        prev.add(id);
      }

      return new Set(prev);
    });
  }, [id]);
};

export const useTableSelectedItems = (id: string) => {
  const stateMolecule = useTableStateMolecule();

  const selectedIDs = useAtomValue(stateMolecule.selectedIDs);
  const onToggleSelected = useTableOnToggleSelectedItem(stateMolecule, id);

  const hasSelected = !!selectedIDs.size;
  const isSelected = selectedIDs.has(id);

  return {
    isSelected,
    hasSelected,
    onToggleSelected,
  };
};

export const useTableHotkeys = ({
  items,
  onNavigate,
}: {
  items: Atom<TableItem>[];
  onNavigate?: (resourceID: string, direction: 'up' | 'down') => void;
}) => {
  const store = useStore();
  const stateMolecule = useTableStateMolecule();
  const persistedNavigate = usePersistFunction(onNavigate);

  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    const onUp = () => {
      const activeID = store.get(stateMolecule.activeID);

      if (!activeID) return;

      const resources = items.map((atom) => store.get(atom));

      if (resources.length <= 1) return;

      const currentIndex = resources.findIndex((resource) => resource.id === activeID);

      if (currentIndex === -1) {
        return;
      }

      const nextIndex = currentIndex - 1;

      persistedNavigate(nextIndex < 0 ? resources[resources.length - 1].id : resources[nextIndex].id, 'up');
    };

    const onDown = () => {
      const activeID = store.get(stateMolecule.activeID);

      if (!activeID) return;

      const resources = items.map((atom) => store.get(atom));

      if (resources.length <= 1) return;

      const currentIndex = resources.findIndex((resource) => resource.id === activeID);

      if (currentIndex === -1) {
        return;
      }

      const nextIndex = currentIndex + 1;

      persistedNavigate(nextIndex >= resources.length ? resources[0].id : resources[nextIndex].id, 'down');
    };

    const callback = (event: KeyboardEvent) => {
      const element = event.target && event.target instanceof HTMLElement ? event.target : null;

      if (
        element &&
        (element.tagName === 'INPUT' ||
          element.tagName === 'SELECT' ||
          element.tagName === 'TEXTAREA' ||
          element?.getAttribute('contenteditable') === 'true' ||
          element?.closest('[contenteditable="true"]'))
      ) {
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        event.stopPropagation();

        onUp();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        event.stopPropagation();

        onDown();
      }
    };

    window.addEventListener('keydown', callback);

    return () => {
      window.removeEventListener('keydown', callback);
    };
  }, [items]);
};
