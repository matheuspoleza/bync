import { useState } from 'react';

import { Button } from '@/components/Buttons/Button';
import { Section } from '@/components/Section';

import {
  codeEditorButtonContainerRecipe,
  codeEditorButtonStyles,
  codeWrapperRecipe,
  editorStyles,
} from './CodeEditorWrapper.css';
import type { ICodeEditorWrapper } from './types';

export const CodeEditorWrapper: React.FC<ICodeEditorWrapper> = ({
  title,
  codeEditor,
  headerButtonProps,
  showExpandButton = true,
  bottomButtonProps,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleExpandClick = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <section className={codeWrapperRecipe({ fullScreen: isFullScreen, hasBottomButton: !!bottomButtonProps })}>
      <Section.Header.Container title={title} theme="dark">
        {headerButtonProps && (
          <Section.Header.Button
            variant="dark"
            iconName={headerButtonProps.iconName}
            onClick={headerButtonProps.onClick}
          />
        )}
        {showExpandButton && (
          <Section.Header.Button
            variant="dark"
            iconName={isFullScreen ? 'Minimize' : 'Expand'}
            onClick={handleExpandClick}
          />
        )}
      </Section.Header.Container>
      <span className={editorStyles}>{codeEditor}</span>

      {bottomButtonProps && (
        <div className={codeEditorButtonContainerRecipe({ fullScreen: isFullScreen })}>
          <Button className={codeEditorButtonStyles} variant="secondaryDark" {...bottomButtonProps} />
        </div>
      )}
    </section>
  );
};
