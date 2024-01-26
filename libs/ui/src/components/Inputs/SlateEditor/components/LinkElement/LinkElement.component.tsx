import React from 'react';

import { usePluginOptions } from '../../contexts/PluginsOptions.context';
import { PluginType } from '../../SlateEditor.constant';
import { linkStyle } from './LinkElement.css';
import { useOpenLink } from './LinkElement.hook';
import type { ILinkElement } from './LinkElement.interface';

export const LinkElement: React.FC<ILinkElement> = ({ attributes, children, element }) => {
  const pluginOptions = usePluginOptions(PluginType.LINK);

  const openLink = useOpenLink({ element, pluginOptions });

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span {...attributes} className={linkStyle} onMouseDown={openLink}>
      {children}
    </span>
  );
};
