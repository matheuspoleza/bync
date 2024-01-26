import type { IconName } from '@bync/icons';
import React from 'react';
import type { Editor } from 'slate';
import { useSlateSelector, useSlateStatic } from 'slate-react';

import { usePersistFunction } from '@/hooks';

import { useEditorHotkey } from '../../../hooks/hotkeys.hook';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton.component';
import type { IToolbarButton } from '../ToolbarButton/ToolbarButton.interface';

export interface PropertyButtonBaseFactoryOptions {
  hotkey?: string;
  iconName: IconName;
  canRemove?: boolean;
  displayName: string;
}

export interface PropertyButtonFactoryOptions extends PropertyButtonBaseFactoryOptions {
  nullable?: boolean;
}

interface ButtonFactoryOptions {
  hotkey?: string;
  iconName: IconName;
  onAction: (editor: Editor, active: boolean) => void;
  isActive: (editor: Editor) => boolean;
  canRemove?: boolean;
  displayName: string;
}

type PropertyButton = React.FC<{ component?: React.FC<IToolbarButton>; iconName?: IconName }>;

export const buttonFactory = ({
  hotkey,
  iconName: defaultIcon,
  onAction,
  isActive,
  canRemove,
  displayName,
}: ButtonFactoryOptions): PropertyButton => {
  const ButtonComponent: PropertyButton = ({ component: Component, iconName = defaultIcon }) => {
    const editor = useSlateStatic();
    const stylesApplied = useSlateSelector(isActive);

    const handleMouseDown = usePersistFunction((event: React.MouseEvent) => {
      event.preventDefault();

      onAction(editor, stylesApplied);
    });

    useEditorHotkey(hotkey ?? '', () => {
      if (hotkey) {
        onAction(editor, stylesApplied);
      }
    });

    if (Component)
      return (
        <Component
          canRemove={canRemove}
          iconName={iconName}
          onMouseDown={handleMouseDown}
          stylesApplied={stylesApplied}
        />
      );

    return (
      <ToolbarButton
        iconName={iconName}
        canRemove={canRemove}
        onMouseDown={handleMouseDown}
        stylesApplied={stylesApplied}
      />
    );
  };

  ButtonComponent.displayName = displayName;

  return ButtonComponent;
};
