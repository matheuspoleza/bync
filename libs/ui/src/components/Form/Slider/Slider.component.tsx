import { clsx } from '@bync/style';
import type { ReactSliderProps } from 'react-slider';
import ReactSlider from 'react-slider';

import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';
import type { BaseProps, FormControlProps } from '@/types';

import { MIN_STEP } from './Slider.const';
import {
  labelStyles,
  markRecipe,
  markStyles,
  rangeStyles,
  sliderContainerStyles,
  thumbActiveStyles,
  thumbStyles,
} from './Slider.css';
import { snapToClosestMark } from './utils';

export interface ISlider
  extends BaseProps,
    FormControlProps<number>,
    Omit<ReactSliderProps, 'marks' | 'defaultValue' | 'value' | 'onChange'> {
  startLabel: string;
  endLabel: string;
  marks?: number | number[];
  className?: string;
  shouldSnapToMark?: boolean;
}

export const Slider: React.FC<ISlider> = ({
  marks = 2,
  min = 0,
  max = 100,
  startLabel,
  endLabel,
  className,
  value = 50,
  onValueChange,
  shouldSnapToMark = false,
  testID,
  step: defaultStep = MIN_STEP,
  ...props
}) => {
  const normalizedMarks = Array.isArray(marks)
    ? marks
    : Array.from({ length: marks }, (_, i) => i * Math.round(100 / (marks - 1)));

  const hasOnlyDefaultMarks =
    normalizedMarks.length === 2 && normalizedMarks.includes(0) && normalizedMarks.includes(100);

  const hasIrregularMarks = Array.isArray(marks) && marks.length > 0;

  const handleChange = (value: number) => {
    const newValue =
      shouldSnapToMark || (!hasOnlyDefaultMarks && normalizedMarks.length > 2)
        ? snapToClosestMark(normalizedMarks, value)
        : value;
    onValueChange?.(newValue);
  };

  const step = hasOnlyDefaultMarks || hasIrregularMarks ? defaultStep : 100 / (normalizedMarks.length - 1);

  return (
    <div className={className} data-testid={`${testID}--slider-container`}>
      <ReactSlider
        {...props}
        onChange={handleChange}
        step={step}
        className={sliderContainerStyles}
        trackClassName={rangeStyles}
        defaultValue={value}
        thumbClassName={thumbStyles}
        markClassName={markStyles}
        marks={normalizedMarks}
        min={min}
        value={value}
        thumbActiveClassName={thumbActiveStyles}
        max={max}
        data-testid={`${testID}--slider`}
        renderMark={({ key, ...props }) => {
          const markClass = markRecipe({ variant: Number(key) <= value ? 'marked' : 'basic' });
          return <span {...props} className={clsx(props.className, markClass)} key={key} />;
        }}
      />
      <Box mt={8} justify="space-between">
        <Text variant="caption" className={labelStyles} data-testid={`${testID}--slider-label-l`}>
          {startLabel}
        </Text>
        <Text variant="caption" className={labelStyles} data-testid={`${testID}--slider-label-r`}>
          {endLabel}
        </Text>
      </Box>
    </div>
  );
};
