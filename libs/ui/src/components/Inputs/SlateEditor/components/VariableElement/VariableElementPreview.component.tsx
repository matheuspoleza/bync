import React from 'react';

import { Entity, Variable } from '@/components/Other/VariableEntity';

import { DEFAULT_VARIABLES_PLUGIN_OPTIONS } from '../../editor/plugins/variables.plugin';
import { PluginType, VariableElementVariant } from '../../SlateEditor.constant';
import { variableStyle } from './VariableElement.css';
import { useOpenVariable } from './VariableElement.hook';
import type { IVariableElementPreview } from './VariableElement.interface';

export const VariableElementPreview: React.FC<IVariableElementPreview> = ({ element, children, pluginsOptions }) => {
  const pluginOptions = pluginsOptions[PluginType.VARIABLE] ?? DEFAULT_VARIABLES_PLUGIN_OPTIONS;
  const openVariable = useOpenVariable({ element, pluginOptions });

  const variable = pluginOptions.variablesMap?.[element.variableID];

  const isVariableVariant = element.variableVariant === VariableElementVariant.VARIABLE;
  const Component = isVariableVariant ? Variable : Entity;

  return (
    <span>
      {/* TODO: add overflow tooltip wrapper */}
      {variable ? (
        <Component
          size={isVariableVariant ? 'large' : 'default'}
          color={variable.color as any} // TODO: remove any when variable color type will be fixed
          label={variable.name}
          className={variableStyle()}
          onMouseDown={openVariable}
        />
      ) : (
        `{${element.variableID}}`
      )}

      {children}
    </span>
  );
};
