import { assignInlineVars, clsx } from '@bync/style';
import ReactSlider from 'react-slider';

import type { ISlider } from '@/components/Form';
import { Tokens } from '@/styles';

import { ColorPickerThumb } from '../ColorPickerThumb/ColorPickerThumb.component';
import { handleStyles } from '../ColorPickerThumb/ColorPickerThumb.css';
import { Track } from '../Track/Track.component';
import { opacityColorVar, overrideStyles, shift } from '../Track/Track.css';

export interface IOpacitySelector extends Omit<ISlider, 'marks' | 'startLabel' | 'endLabel' | 'min' | 'max'> {
  color?: string;
}

export const OpacitySelector: React.FC<IOpacitySelector> = ({
  testID,
  className,
  value,
  color,
  onValueChange,
  ...props
}) => {
  const inlineStyles = assignInlineVars({ [opacityColorVar]: color ?? Tokens.colors.accent.accent500 });

  return (
    <ReactSlider
      {...props}
      step={0.01}
      min={0}
      max={1}
      className={overrideStyles}
      onAfterChange={(value) => onValueChange?.(value)}
      renderTrack={(props, { value }) => (
        <Track
          variant="opacity"
          className={clsx(props.className, overrideStyles, className)}
          onClick={() => onValueChange?.(value)}
          style={inlineStyles}
          testID={testID}
          key={props.key}
        />
      )}
      renderThumb={({ key, ...props }) => (
        <ColorPickerThumb key={key} {...props} className={clsx(handleStyles, shift)} testID={testID} />
      )}
      value={value}
      data-testid={`${testID}--opacity-slider`}
    />
  );
};
