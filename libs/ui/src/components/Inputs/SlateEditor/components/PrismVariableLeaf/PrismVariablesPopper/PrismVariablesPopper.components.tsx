import React from 'react';
import { useSlateStatic } from 'slate-react';

import { usePersistFunction } from '@/hooks';

import { usePluginOptions } from '../../../contexts/PluginsOptions.context';
import type { VariableItem } from '../../../editor/plugins/variables.plugin';
import { StaticEditor } from '../../../editor/staticEditor';
import { PluginType } from '../../../SlateEditor.constant';
import { SuggestionsPopper } from '../../SuggestionsPopper/SuggestionsPopper.component';
import type { IPrismVariablesPopper } from './PrismVariablesPopper.interface';

const NOT_VALID_VAR_REGEXP = /[^\w ]/g;

const formatVariable = (variable: string): string => variable.replace(NOT_VALID_VAR_REGEXP, '');

export const PrismVariablesPopper: React.FC<IPrismVariablesPopper> = ({ leaf, textNode }) => {
  const editor = useSlateStatic();
  const { onEdit, canEdit, onAdded, onCreate, canCreate, variablesMap, createButtonLabel } = usePluginOptions(
    PluginType.VARIABLE
  );

  const onSelect = usePersistFunction((variable: VariableItem) => {
    if (!leaf.range) return;

    StaticEditor.replaceWithVariable(editor, leaf.range, variable);
    onAdded?.(variable);
  });

  return (
    <SuggestionsPopper
      search={leaf.text}
      onEdit={onEdit}
      canEdit={canEdit}
      onCreate={onCreate}
      onSelect={onSelect}
      canCreate={canCreate}
      formatter={formatVariable}
      isSelected={leaf.isSelected}
      referenceNode={textNode}
      suggestionsMap={variablesMap}
      createButtonLabel={createButtonLabel}
    />
  );
};
