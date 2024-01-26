import { useRef, useState } from 'react';

import { Box } from '@/components/Utility/Box';

import { Input } from '../Input.component';
import { containerStyle, firstLineStyle, secondLineStyleRecipe, secondLineWrapper } from './TwoLineinput.css';
import type { ITwoLineInput } from './types';

export const TwoLineInput: React.FC<ITwoLineInput> = ({
  firstLineProps,
  secondLineProps,
  hideSecondLineOnBlur = false,
  testID,
}) => {
  const [isFirstLineFocused, setIsFirstInputFocused] = useState(!hideSecondLineOnBlur);
  const containerRef = useRef<HTMLDivElement>(null);

  const onComponentFocus = () => {
    if (hideSecondLineOnBlur) {
      setIsFirstInputFocused(true);
    }
  };

  const onComponentBlur = () => {
    if (hideSecondLineOnBlur) {
      setIsFirstInputFocused(false);
    }
  };

  return (
    <Box
      direction="column"
      className={containerStyle}
      testID={testID}
      ref={containerRef}
      onFocus={onComponentFocus}
      onBlur={onComponentBlur}
    >
      <Input variant="ghost" className={firstLineStyle} {...firstLineProps} testID={`${testID}--first-line`} />
      <Input
        variant="ghost"
        className={secondLineStyleRecipe({ error: secondLineProps?.error })}
        containerClassName={secondLineWrapper({ show: isFirstLineFocused })}
        testID={`${testID}--second-line`}
        {...secondLineProps}
      />
    </Box>
  );
};
