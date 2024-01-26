import { clsx } from '@bync/style';
import { Fragment, memo, useMemo } from 'react';
import { type Descendant, Element } from 'slate';

import { withDefaultOptions } from '../../editor/editor.util';
import { StaticEditor } from '../../editor/staticEditor';
import { defaultRenderElementPreview } from '../../renderers/element.renderer';
import { defaultRenderLeafPreview } from '../../renderers/leaf.renderer';
import { PluginType } from '../../SlateEditor.constant';
import { editorStyle } from '../../SlateEditor.css';
import { placeholderStyle } from '../Placeholder/Placeholder.css';
import { ALL_PLUGINS, PREVIEW_EDITOR } from './Preview.constant';
import type { IPreview } from './Preview.interface';

export const Preview = memo<IPreview>(
  ({
    value,
    testID,
    editor = PREVIEW_EDITOR,
    disabled,
    className,
    placeholder,
    pluginsOptions: pluginsOptionsProp,
    renderLeafPreview = defaultRenderLeafPreview,
    renderElementPreview = defaultRenderElementPreview,
  }) => {
    const pluginsOptions = useMemo(() => withDefaultOptions(ALL_PLUGINS, pluginsOptionsProp), [pluginsOptionsProp]);

    const isEmpty = useMemo(() => StaticEditor.isNewState(value), [value]);

    const render = (children: Descendant[]) =>
      children.map((child, index) => (
        <Fragment key={index}>
          {Element.isElement(child)
            ? renderElementPreview({ element: child, editor, pluginsOptions, children: render(child.children) })
            : renderLeafPreview({ leaf: child, editor, pluginsOptions })}
        </Fragment>
      ));

    return (
      <div
        data-testid={testID}
        {...{ disabled }}
        className={clsx(editorStyle({ nowrap: pluginsOptions[PluginType.SINGLE_LINE]?.nowrap }), className)}
      >
        {isEmpty ? <span className={placeholderStyle}>{placeholder}</span> : render(value)}
      </div>
    );
  }
);
