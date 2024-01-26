import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IButton } from '@/components/Buttons/Button';
import { Button } from '@/components/Buttons/Button';
import type { ComponentCartesianProps } from '@/storybook/CartesianProduct';
import { CartesianProduct } from '@/storybook/CartesianProduct';

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: 'Buttons/Button',
  component: Button,
};

export default meta;

export const Base: Story = {
  args: {
    label: 'Label',
  },
};

const LoadingButton = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => {
    setIsLoading((prev) => !prev);
  };

  return <Button isLoading={isLoading} onClick={handleClick} label="Howdy" />;
};

export const Loading: Story = {
  render: LoadingButton,
};

const SIZES = Object.keys(Button.css.buttonSizes) as IButton['size'][];

const COMBINATIONS: ComponentCartesianProps<IButton> = {
  size: SIZES,
  isActive: [false, true],
  disabled: [false, true],
  iconName: [undefined, 'Copy'],
  isHovering: [false, true],
  isLoading: [false, true],
  fullWidth: [false, true],
};

const SHARED_EXAMPLES_PROPS = {
  groupBy: 'size',
  columns: 3,
  combinations: COMBINATIONS,
  componentName: Button.name,
} as const;

export const PrimaryExamples: Story = {
  render: () => (
    <CartesianProduct<IButton>
      {...SHARED_EXAMPLES_PROPS}
      Component={(props) => <Button {...props} variant="primary" onClick={() => null} label="Howdy" />}
    />
  ),
};

export const SecondaryExamples: Story = {
  render: () => (
    <CartesianProduct<IButton>
      {...SHARED_EXAMPLES_PROPS}
      Component={(props) => <Button {...props} variant="secondary" onClick={() => null} label="Howdy" />}
    />
  ),
};

export const SecondaryDarkExamples: Story = {
  render: () => (
    <CartesianProduct<IButton>
      {...SHARED_EXAMPLES_PROPS}
      isDark={true}
      Component={(props) => <Button {...props} variant="secondaryDark" onClick={() => null} label="Howdy" />}
    />
  ),
};

export const TertiaryExamples: Story = {
  render: () => (
    <CartesianProduct<IButton>
      {...SHARED_EXAMPLES_PROPS}
      Component={(props) => <Button {...props} variant="tertiary" onClick={() => null} label="Howdy" />}
    />
  ),
};

export const TertiaryLabelessExamples: Story = {
  render: () => (
    <CartesianProduct<IButton>
      combinations={{
        iconName: ['More', 'Copy'],
        isHovering: [false, true],
        isActive: [false, true],
        size: ['small'],
      }}
      Component={(props) => <Button {...props} variant="tertiary" onClick={() => null} />}
    />
  ),
};

export const TertiaryDarkExamples: Story = {
  render: () => (
    <CartesianProduct<IButton>
      {...SHARED_EXAMPLES_PROPS}
      isDark={true}
      Component={(props) => <Button {...props} variant="tertiaryDark" onClick={() => null} label="Howdy" />}
    />
  ),
};

export const AlertExamples: Story = {
  render: () => (
    <CartesianProduct<IButton>
      {...SHARED_EXAMPLES_PROPS}
      Component={(props) => <Button {...props} variant="alert" onClick={() => null} label="Howdy" />}
    />
  ),
};

export const ThemedDefaultExamples: Story = {
  render: () => (
    <CartesianProduct<IButton>
      {...SHARED_EXAMPLES_PROPS}
      Component={(props) => <Button {...props} variant="themedDefault" onClick={() => null} label="Howdy" />}
    />
  ),
};

export const ThemedAlertExamples: Story = {
  render: () => (
    <CartesianProduct<IButton>
      {...SHARED_EXAMPLES_PROPS}
      Component={(props) => <Button {...props} variant="themedAlert" onClick={() => null} label="Howdy" />}
    />
  ),
};

export const ThemedSuccessExamples: Story = {
  render: () => (
    <CartesianProduct<IButton>
      {...SHARED_EXAMPLES_PROPS}
      Component={(props) => <Button {...props} variant="themedSuccess" onClick={() => null} label="Howdy" />}
    />
  ),
};
