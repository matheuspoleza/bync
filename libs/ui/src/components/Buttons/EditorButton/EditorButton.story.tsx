import type { Meta, StoryObj } from '@storybook/react';

import { Toggle } from '@/components/Form';
import { Box } from '@/main';
import type { ICartesianProduct } from '@/storybook/CartesianProduct';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { EditorButton } from './EditorButton.component';
import { EditorButtonSuffixButton } from './EditorButtonSuffixButton';
import type { IEditorButton } from './types';

const toggle = <Toggle value={true} />;

type Story = StoryObj<typeof EditorButton>;

const meta: Meta<typeof EditorButton> = {
  title: 'Buttons/Editor Button',
  component: EditorButton,
};

const defaultArgs: Partial<IEditorButton> = {
  label: 'Label',
  prefixIconName: 'Set',
};

const defaultCartesianArgs: ICartesianProduct<IEditorButton>['combinations'] = {
  prefixIconName: ['Set'],
  label: ['Label'],
  secondLabel: [undefined, 'Value'],
  caption: [undefined, 'Caption'],
  suffixButtons: [
    undefined,
    [<EditorButtonSuffixButton key={0} iconName="Minus" />],
    [<EditorButtonSuffixButton key={0} iconName="More" />],
    [<EditorButtonSuffixButton key={0} iconName="More" />, <EditorButtonSuffixButton key={0} iconName="Minus" />],
  ],
  toggle: [undefined, toggle],
};

export default meta;

export const Base: Story = {
  args: {
    ...defaultArgs,
  },
};

export const NoIcon: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => {
    return (
      <Box direction="column">
        <EditorButton {...args} prefixIconName={undefined} />
        <EditorButton {...args} />
      </Box>
    );
  },
};

export const Empty: Story = {
  args: {
    ...defaultArgs,
    isEmpty: true,
  },
};
export const EmptyHovered: Story = {
  args: {
    ...defaultArgs,
    isEmpty: true,
    isHovering: true,
  },
};
export const Disabled: Story = {
  args: {
    ...defaultArgs,
    isEmpty: true,
    disabled: true,
  },
};

export const SecondLabel: Story = {
  args: {
    ...defaultArgs,
    secondLabel: 'Value',
  },
};

export const ActiveSecondLabel: Story = {
  args: {
    ...defaultArgs,
    isActive: true,
    secondLabel: 'Value',
  },
};

export const OneLongLabel: Story = {
  args: {
    ...defaultArgs,
    label: 'Whippersnapper',
    prefixIconName: 'Set',
  },
};

export const TwoLongLabels: Story = {
  args: {
    ...defaultArgs,
    label: 'Whippersnapper',
    secondLabel: 'Gobbledygook',
  },
};

export const WithCaption: Story = {
  args: {
    ...defaultArgs,
    caption: 'Caption',
  },
};
export const WithFirstButton: Story = {
  args: {
    ...defaultArgs,
    suffixButtons: [<EditorButtonSuffixButton key={0} iconName="More" />],
  },
};
export const ActiveButton: Story = {
  args: {
    ...defaultArgs,
    isActive: true,
    suffixButtons: [<EditorButtonSuffixButton key={0} iconName="More" />],
  },
};
export const HoverButton: Story = {
  args: {
    ...defaultArgs,
    isHovering: true,
    suffixButtons: [<EditorButtonSuffixButton key={0} iconName="More" />],
  },
};

export const WithBothButtons: Story = {
  args: {
    ...defaultArgs,
    suffixButtons: [
      <EditorButtonSuffixButton key={0} iconName="More" />,
      <EditorButtonSuffixButton key={0} iconName="Minus" />,
    ],
  },
};
export const WithToggle: Story = {
  args: {
    ...defaultArgs,
    toggle: <Toggle value={true} />,
  },
};

export const Labels: Story = {
  render: () => (
    <CartesianProduct<IEditorButton>
      componentName={EditorButton.name}
      Component={(props) => <EditorButton {...props} />}
      combinations={{
        prefixIconName: ['Set'],
        label: ['Label', 'Suuuuper looooooong laaaaaaabeeeeeeel'],
        secondLabel: [undefined, 'Value', 'Suuuuper looooooong vaaaaaluuuuuuue'],
        caption: [undefined, 'Caption'],
      }}
      isHidden={({ caption, suffixButtons, toggle, secondLabel }) => {
        return !!(
          (caption && (suffixButtons?.length || toggle || secondLabel)) ||
          (toggle && (suffixButtons?.length ?? 0) > 1)
        );
      }}
      columns={2}
    />
  ),
};

export const Active: Story = {
  render: () => (
    <CartesianProduct<IEditorButton>
      componentName={EditorButton.name}
      Component={(props) => <EditorButton {...props} />}
      combinations={{
        ...defaultCartesianArgs,
        isActive: [true],
      }}
      isHidden={({ caption, suffixButtons, toggle, secondLabel }) => {
        return !!(
          (caption && (suffixButtons?.length || toggle || secondLabel)) ||
          (toggle && (suffixButtons?.length ?? 0) > 1)
        );
      }}
      columns={2}
    />
  ),
};
export const Hover: Story = {
  render: () => (
    <CartesianProduct<IEditorButton>
      componentName={EditorButton.name}
      Component={(props) => <EditorButton {...props} />}
      combinations={{
        ...defaultCartesianArgs,
        isHovering: [true],
      }}
      isHidden={({ caption, suffixButtons, toggle, secondLabel }) => {
        return !!(
          (caption && (suffixButtons?.length || toggle || secondLabel)) ||
          (toggle && (suffixButtons?.length ?? 0) > 1)
        );
      }}
      columns={2}
    />
  ),
};

export const WithButtons: Story = {
  render: () => (
    <CartesianProduct<IEditorButton>
      componentName={EditorButton.name}
      Component={(props) => <EditorButton {...props} />}
      combinations={{
        prefixIconName: ['Set'],
        label: ['Label'],
        suffixButtons: [
          [<EditorButtonSuffixButton key={0} iconName="More" />],
          [<EditorButtonSuffixButton key={0} iconName="More" />, <EditorButtonSuffixButton key={0} iconName="Minus" />],
        ],
        toggle: [undefined, toggle],
      }}
      isHidden={({ suffixButtons, toggle }) => {
        return !!(suffixButtons && toggle);
      }}
      columns={2}
    />
  ),
};

export const EmptyStates: Story = {
  render: () => (
    <CartesianProduct<IEditorButton>
      componentName={EditorButton.name}
      Component={(props) => <EditorButton {...props} />}
      combinations={{
        prefixIconName: ['Set'],
        label: ['Label'],
        secondLabel: [undefined, 'Value'],
        isEmpty: [true],
        caption: [undefined, 'Caption'],
      }}
      isHidden={({ caption, suffixButtons, toggle, secondLabel }) => {
        return !!(
          (caption && (suffixButtons?.length || toggle || secondLabel)) ||
          (toggle && (suffixButtons?.length ?? 0) > 1)
        );
      }}
      columns={2}
    />
  ),
};
export const WarningState: Story = {
  render: () => (
    <CartesianProduct<IEditorButton>
      componentName={EditorButton.name}
      Component={(props) => <EditorButton {...props} />}
      combinations={{
        prefixIconName: ['Set'],
        label: ['Label'],
        warningTooltipContent: ['Missing reprompt'],
        isActive: [false, true],
        isWarning: [true],
      }}
      columns={2}
    />
  ),
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IEditorButton>
      componentName={EditorButton.name}
      Component={(props) => <EditorButton {...props} />}
      combinations={{
        ...defaultCartesianArgs,
        disabled: [false, true],
      }}
      isHidden={({ caption, suffixButtons, toggle, secondLabel }) => {
        return !!(
          (caption && (suffixButtons?.length || toggle || secondLabel)) ||
          (toggle && (suffixButtons?.length ?? 0) > 1)
        );
      }}
      columns={2}
    />
  ),
};
