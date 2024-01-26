import type { Atom, PrimitiveAtom } from 'jotai';
import { atom } from 'jotai';

import type { TableItem } from './Table.interface';

export const updateItemAtom = <T extends TableItem>(itemsAtoms: PrimitiveAtom<Atom<T>[]>) => {
  return atom(null, (get, set, update: T) => {
    const items = get(itemsAtoms) as Atom<T>[];

    const index = items.findIndex((item) => get(item).id === update.id);

    if (index === -1) return;

    const updatedItems = [
      ...items.slice(0, index),
      {
        ...items[index],
        ...atom(update),
      },
      ...items.slice(index + 1),
    ];

    set(itemsAtoms, updatedItems);
  });
};
