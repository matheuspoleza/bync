import { clsx } from '@bync/style';
import ReactSlider from 'react-slider';

import type { ISlider } from '@/components/Form';

import { ColorPickerThumb } from '../ColorPickerThumb/ColorPickerThumb.component';
import { handleStyles } from '../ColorPickerThumb/ColorPickerThumb.css';
import { Track } from '../Track/Track.component';
import { overrideStyles, shift } from '../Track/Track.css';

export interface IHueSelector extends Omit<ISlider, 'marks' | 'startLabel' | 'endLabel' | 'min' | 'max'> {
  /**
   * @description if the color string is provided, the slider thumb will be colored with the provided color
   * @example #fff330
   */
  previewColor?: string;
}

export const HueSelector: React.FC<IHueSelector> = ({
  testID,
  className,
  value,
  previewColor,
  onValueChange,
  ...props
}) => {
  const handleChange = (value: number) => {
    onValueChange?.(value);
  };

  return (
    <ReactSlider
      {...props}
      step={0.5}
      min={1}
      onChange={(value) => handleChange(value)}
      max={360}
      className={overrideStyles}
      renderTrack={(props, { value }) => (
        <Track
          variant="hue"
          className={clsx(props.className, overrideStyles, className)}
          onClick={() => handleChange(value)}
          testID={testID}
          key={props.key}
        />
      )}
      renderThumb={({ key, ...props }) => (
        <ColorPickerThumb
          key={key}
          {...props}
          className={clsx(handleStyles, shift)}
          testID={testID}
          color={previewColor}
        />
      )}
      value={value}
      data-testid={`${testID}--hue-slider`}
    />
  );
};
