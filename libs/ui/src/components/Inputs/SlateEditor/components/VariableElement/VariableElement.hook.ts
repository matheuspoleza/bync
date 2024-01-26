import type React from 'react';

import { isEventActionKey } from '@/utils/event.util';

import type { VariablesPluginOptions } from '../../editor/plugins/variables.plugin';
import type { VariableElement } from '../../SlateEditor.interface';

export const useOpenVariable =
  ({ element, pluginOptions }: { element: VariableElement; pluginOptions: VariablesPluginOptions }) =>
  (event: React.MouseEvent) => {
    const variableItem = pluginOptions.variablesMap?.[element.variableID];

    if (isEventActionKey(event) || !pluginOptions.onClick || !variableItem) return;

    event.stopPropagation();
    event.preventDefault();

    if (!variableItem) return;

    pluginOptions.onClick?.(variableItem);
  };
