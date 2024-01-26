import { useMemo } from 'react';

import type { PopperModifier } from '@/components/Utility/Popper/Popper.interface';
import { TOOLTIP_DEFAULT_MODIFIERS } from '@/components/Utility/Tooltip/Tooltip.constant';

export const useTooltipModifiers = <Modifiers>(
  modifiers: ReadonlyArray<PopperModifier<Modifiers>>,
  deps: unknown[] = []
) => useMemo(() => [...TOOLTIP_DEFAULT_MODIFIERS, ...modifiers], deps);
