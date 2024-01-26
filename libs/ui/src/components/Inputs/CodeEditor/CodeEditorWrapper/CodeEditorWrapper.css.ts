import { recipe, style } from '@bync/style';

import { border, colors, transition } from '@/styles/theme';
import { zIndex } from '@/styles/theme/tokens/zIndex';

export const codeWrapperStyle = style({
  zIndex: zIndex.codeEditor,
  color: colors.neutralLight.neutralsLight200,
  background: colors.neutralDark.neutralsDark600,
  paddingTop: '11px',
  width: '100%',
  transition: transition(['width']),
});

export const codeWrapperRecipe = recipe({
  base: codeWrapperStyle,
  variants: {
    fullScreen: {
      true: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        borderRadius: 0,
      },
      false: {
        borderRadius: border.radius[10],
      },
    },
    hasBottomButton: {
      true: {
        paddingBottom: '0px',
      },
      false: {
        paddingBottom: '2px',
      },
    },
  },
});

export const editorStyles = style({
  paddingTop: '7px',
  paddingBottom: '12px',
});

export const codeEditorButtonStyles = style({
  borderRadius: border.radius[6],
  width: '100%',
});

export const codeEditorButtonContainerRecipe = recipe({
  base: {
    position: 'relative',
    padding: '4px',
  },
  variants: {
    fullScreen: {
      true: {
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        right: '0px',
      },
    },
  },
});

export const codeEditorWrapperInputStyles = style({
  minHeight: '72px',
});
