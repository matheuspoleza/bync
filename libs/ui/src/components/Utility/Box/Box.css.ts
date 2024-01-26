import { createVar, recipe, style, styleVariants } from '@bync/style';

export const marginVar = createVar();
export const gapVar = createVar();
export const growVar = createVar();
export const paddingVar = createVar();
export const widthVar = createVar();
export const heightVar = createVar();
export const minWidthVar = createVar();
export const maxWidthVar = createVar();
export const minHeightVar = createVar();
export const maxHeightVar = createVar();
export const shrinkVar = createVar();

const boxBaseStyles = style({
  vars: {
    [marginVar]: '0',
    [gapVar]: '0',
    [growVar]: '0',
    [shrinkVar]: '1',
    [paddingVar]: '0',
    [widthVar]: 'auto',
    [heightVar]: 'auto',
    [minWidthVar]: 'none',
    [maxWidthVar]: 'none',
    [minHeightVar]: 'none',
    [maxHeightVar]: 'none',
  },
  gap: gapVar,
  flexGrow: growVar,
  flexShrink: shrinkVar,
  margin: marginVar,
  padding: paddingVar,
  width: widthVar,
  height: heightVar,
  minWidth: minWidthVar,
  maxWidth: maxWidthVar,
  minHeight: minHeightVar,
  maxHeight: maxHeightVar,
});

export const boxJustifyVariants = styleVariants({
  center: { justifyContent: 'center' },
  start: { justifyContent: 'flex-start' },
  end: { justifyContent: 'flex-end' },
  'space-between': { justifyContent: 'space-between' },
  'space-around': { justifyContent: 'space-around' },
  'space-evenly': { justifyContent: 'space-evenly' },
});

export const boxDirectionVariants = styleVariants({
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
});

export const boxWrapVariants = styleVariants({
  nowrap: { flexWrap: 'nowrap' },
  wrap: { flexWrap: 'wrap' },
  'wrap-reverse': { flexWrap: 'wrap-reverse' },
});

export const alignItemsVariants = styleVariants({
  center: { alignItems: 'center' },
  start: { alignItems: 'flex-start' },
  end: { alignItems: 'flex-end' },
  stretch: { alignItems: 'stretch' },
  baseline: { alignItems: 'baseline' },
});

export const alignSelfItemsVariants = styleVariants({
  center: { alignSelf: 'center' },
  start: { alignSelf: 'flex-start' },
  end: { alignSelf: 'flex-end' },
  stretch: { alignSelf: 'stretch' },
  baseline: { alignSelf: 'baseline' },
});

export const overflowVariants = styleVariants({
  auto: { overflow: 'auto' },
  clip: { overflow: ['clip', 'hidden'] },
  hidden: { overflow: 'hidden' },
  scroll: { overflow: 'scroll' },
});

export const overflowXVariants = styleVariants({
  auto: { overflowY: 'auto' },
  clip: { overflow: ['clip', 'hidden'] },
  hidden: { overflowY: 'hidden' },
  scroll: { overflowY: 'scroll' },
});

export const overflowYVariants = styleVariants({
  auto: { overflowY: 'auto' },
  clip: { overflow: ['clip', 'hidden'] },
  hidden: { overflowY: 'hidden' },
  scroll: { overflowY: 'scroll' },
});

export const boxRecipe = recipe({
  base: boxBaseStyles,
  variants: {
    justify: boxJustifyVariants,
    direction: boxDirectionVariants,
    align: alignItemsVariants,
    alignSelf: alignSelfItemsVariants,
    wrap: boxWrapVariants,
    overflow: overflowVariants,
    overflowY: overflowYVariants,
    overflowX: overflowXVariants,
    inline: { true: { display: 'inline-flex' }, false: { display: 'flex' } },
  },
});
