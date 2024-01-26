import React from 'react';

import { DEFAULT_LINKS_PLUGIN_OPTIONS } from '../../editor/plugins/links.plugins';
import { PluginType } from '../../SlateEditor.constant';
import { linkStyle } from './LinkElement.css';
import { useOpenLink } from './LinkElement.hook';
import type { ILinkElementPreview } from './LinkElement.interface';

export const LinkElementPreview: React.FC<ILinkElementPreview> = ({ element, children, pluginsOptions }) => {
  const pluginOptions = pluginsOptions[PluginType.LINK] ?? DEFAULT_LINKS_PLUGIN_OPTIONS;

  const openLink = useOpenLink({ element, pluginOptions });

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span className={linkStyle} onMouseDown={openLink}>
      {children}
    </span>
  );
};
