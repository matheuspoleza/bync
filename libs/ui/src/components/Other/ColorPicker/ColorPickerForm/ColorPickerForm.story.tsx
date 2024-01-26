import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Entity } from '@/components';

import { ColorPickerForm } from './ColorPickerForm.component';
import type { ICustomTheme } from './ColorPickerForm.interface';
import { DEFAULT_SCHEME_COLORS } from './constants';

type Story = StoryObj<typeof ColorPickerForm>;

const StoryComponent = () => {
  const [color, setColor] = useState(DEFAULT_SCHEME_COLORS);
  const [customThemes, setCustomThemes] = useState<ICustomTheme[]>([{ color: '#74a1ba', label: 'Nice blue' }]);

  return (
    <ColorPickerForm
      onChange={setColor}
      renderItem={({ color }) => <Entity label="Label" color={color} />}
      customThemes={customThemes}
      selectedColor={color}
      onAddCustomTheme={(theme) => setCustomThemes((prev) => [...prev, theme])}
      onDeleteCustomTheme={(theme) => setCustomThemes((prev) => prev.filter((t) => t.color !== theme.color))}
      onUpdateCustomTheme={(theme) => setCustomThemes((prev) => prev.map((t) => (t.color !== theme.color ? t : theme)))}
    />
  );
};

const meta: Meta<typeof ColorPickerForm> = {
  title: 'Color Picker/Color Picker Form',
  component: ColorPickerForm,
};
export const Examples: Story = {
  render: () => <StoryComponent />,
};

export default meta;
