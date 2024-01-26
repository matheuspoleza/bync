import { TooltipButton } from './components/TooltipButton';
import { TooltipCaption } from './components/TooltipCaption';
import { TooltipCodeBlock } from './components/TooltipCodeBlock';
import { TooltipMedia } from './components/TooltipMedia';
import { TooltipOverflow } from './components/TooltipOverflow';
import { Tooltip as TooltipComponent } from './Tooltip.component';

export * from './components/TooltipArrow';

export const Tooltip = Object.assign(TooltipComponent, {
  Media: TooltipMedia,
  Button: TooltipButton,
  Overflow: TooltipOverflow,
  Caption: TooltipCaption,
  CodeBlock: TooltipCodeBlock,
});
