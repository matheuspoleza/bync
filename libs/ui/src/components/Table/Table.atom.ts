import { atom } from 'jotai';
import { createScope, molecule } from 'jotai-molecules';

import type { TableState, TableStateInitialValue } from './Table.interface';

export const TableStateScope = createScope<TableStateInitialValue<any, any>>({});

export const TableStateMolecule = molecule<TableState<any, any>>((_, getScope) => {
  const defaultValue = getScope(TableStateScope);

  return {
    orderBy: atom(defaultValue?.orderBy ?? null),
    activeID: atom(defaultValue?.activeID ?? null),
    descending: atom(defaultValue?.descending ?? true),
    hoveringID: atom(defaultValue?.hoveringID ?? null),
    selectedIDs: atom(defaultValue?.selectedIDs ?? new Set<string>()),
    sortContext: defaultValue?.sortContext ?? atom(null),
    editMode: atom(defaultValue?.editMode ?? null),
  };
});
