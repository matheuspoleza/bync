import React, { useRef, useState } from 'react';

import { Entity, Variable } from '@/components/Other/VariableEntity';
import { useOutsideClickHandler } from '@/hooks/useOutsideClickHandler';
import { isEventActionKey } from '@/utils/event.util';

import { usePluginOptions } from '../../contexts/PluginsOptions.context';
import { PluginType, VariableElementVariant } from '../../SlateEditor.constant';
import { variableStyle } from './VariableElement.css';
import { useOpenVariable } from './VariableElement.hook';
import type { IVariableElement } from './VariableElement.interface';

export const VariableElement: React.FC<IVariableElement> = ({ attributes, element, children }) => {
  const [isFocused, setIsFocused] = useState(false);
  const pluginOptions = usePluginOptions(PluginType.VARIABLE);
  const ref = useRef<HTMLDivElement>(null);
  const openVariable = useOpenVariable({ element, pluginOptions });

  useOutsideClickHandler(ref, () => {
    setIsFocused(false);
  });

  const variable = pluginOptions.variablesMap?.[element.variableID];

  const isVariableVariant = (variable?.variant ?? element.variableVariant) === VariableElementVariant.VARIABLE;
  const Component = isVariableVariant ? Variable : Entity;
  return (
    <span contentEditable={false} {...attributes}>
      {/* TODO: add overflow tooltip wrapper */}
      <Component
        ref={ref}
        maxWidth={pluginOptions.maxVariableWidth || '100%'}
        size={isVariableVariant ? 'large' : 'default'}
        color={variable?.color as any} // TODO: remove any when variable color type will be fixed
        label={variable?.name ?? element.variableID}
        onClick={(data) => {
          if (pluginOptions.canFocus) {
            openVariable(data);
            setIsFocused(true);
          }
        }}
        isActive={isFocused}
        className={variableStyle()}
        onMouseDown={(event) => !isEventActionKey(event) && pluginOptions.onClick && event.preventDefault()}
      />

      {/* slate requires children to handler deletion correctly */}
      {children}
    </span>
  );
};
