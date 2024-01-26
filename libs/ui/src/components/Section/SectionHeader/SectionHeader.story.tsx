import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react';

import { Box, Button, DragButton, Dropdown } from '@/components';
import { DragButtonContainer } from '@/components/Other/DragButton/DragButtonContainer/DragButtonContainer.component';
import { Text } from '@/components/Text';
import { Tooltip } from '@/components/Utility/Tooltip';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { SectionHeaderButton, SectionHeaderCaption } from './components';
import type { ISectionHeader } from './SectionHeader.component';
import { SectionHeader } from './SectionHeader.component';

const meta: Meta<typeof SectionHeader> = {
  title: 'Section/Header',
  component: SectionHeader,
};

type Story = StoryObj<typeof SectionHeader>;

export const Base: Story = {
  args: {
    title: 'Label',
  },
  render: (props) => (
    <Box style={{ width: '320px' }}>
      <SectionHeader {...props} />
    </Box>
  ),
};

export const Draggable: Story = {
  args: {
    title: 'Label',
  },
  render: (props) => (
    <DragButtonContainer variant="section">
      <Box style={{ width: '320px' }}>
        <SectionHeader {...props}>
          <SectionHeaderButton iconName="Plus" onClick={() => null} />
          <SectionHeaderButton iconName="ArrowDownS" onClick={() => null} />
        </SectionHeader>
      </Box>
    </DragButtonContainer>
  ),
};

export const Disabled: Story = {
  args: {
    title: 'Label',
    variant: 'disabled',
  },
  render: (props) => (
    <Box style={{ width: '320px' }}>
      <SectionHeader {...props}>
        <SectionHeaderButton iconName="Plus" onClick={() => null} disabled />
        <SectionHeaderButton iconName="Copy" onClick={() => null} disabled />
      </SectionHeader>
    </Box>
  ),
};

export const DraggableWithCaption: Story = {
  args: {
    title: 'Label',
  },
  render: (props) => (
    <Box style={{ width: '320px' }}>
      <DragButton.Container variant="section">
        <SectionHeader {...props}>
          <SectionHeaderCaption>Caption</SectionHeaderCaption>
          <SectionHeaderButton iconName="Plus" onClick={() => null} />
          <SectionHeaderButton iconName="ArrowDownS" onClick={() => null} />
        </SectionHeader>
      </DragButton.Container>
    </Box>
  ),
};

export const WithTwoButtons: Story = {
  args: {
    title: 'Label',
  },
  render: (props) => (
    <Box style={{ width: '320px' }}>
      <SectionHeader {...props}>
        <SectionHeaderCaption>Caption</SectionHeaderCaption>
        <SectionHeaderButton iconName="Plus" onClick={() => null} />
        <SectionHeaderButton iconName="ArrowDownS" onClick={() => null} />
      </SectionHeader>
    </Box>
  ),
};

export const WithTwoButtonsDark: Story = {
  args: {
    title: 'Label',
    theme: 'dark',
  },
  render: (props) => (
    <Box style={{ width: '320px' }}>
      <SectionHeader {...props}>
        <SectionHeaderCaption>Caption</SectionHeaderCaption>
        <SectionHeaderButton iconName="Plus" onClick={() => null} />
        <SectionHeaderButton iconName="ArrowDownS" onClick={() => null} />
      </SectionHeader>
    </Box>
  ),
};

export const WithDropdown: Story = {
  args: {
    title: 'Label',
    primaryContent: <Button size="small" label="Value" variant="tertiary" onClick={() => null} />,
  },
  render: (props) => (
    <Box style={{ width: '320px' }}>
      <SectionHeader {...props}>
        <SectionHeaderCaption>Caption</SectionHeaderCaption>
        <SectionHeaderButton iconName="Plus" onClick={() => null} />
      </SectionHeader>
    </Box>
  ),
};

const tooltipTitle = ({ titleClassName = '' }) => (
  <Tooltip
    placement="right"
    referenceElement={({ ref, onToggle }) => (
      <Text ref={ref} className={titleClassName} onMouseEnter={onToggle} onMouseLeave={onToggle}>
        Title
      </Text>
    )}
  >
    {() => <Text variant="caption">Title</Text>}
  </Tooltip>
);

export const WithTooltipOnTitle: Story = {
  args: {
    onHeaderClick: () => console.log('header clicked'),
    title: (titleClassName) => tooltipTitle({ titleClassName }),
  },
  render: (props) => (
    <Box style={{ width: '320px' }}>
      <SectionHeader {...props}>
        <SectionHeaderCaption>Caption</SectionHeaderCaption>
        <SectionHeaderButton iconName="Plus" onClick={() => null} />
      </SectionHeader>
    </Box>
  ),
};

const ExampleHeader = (props: ISectionHeader) => (
  <SectionHeader {...props} title="Label">
    {props.children ? (
      <>
        <SectionHeaderCaption>Caption</SectionHeaderCaption>
        <SectionHeaderButton iconName="Plus" onClick={() => null} disabled={props.variant === 'disabled'} />
      </>
    ) : null}
  </SectionHeader>
);

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ISectionHeader>
      componentName={SectionHeader.name}
      Component={(props) => {
        const isDisabled = props.variant === 'disabled';
        const Container = isDisabled ? Fragment : DragButton.Container;

        return (
          <Container {...(isDisabled ? {} : { variant: 'section' })}>
            <ExampleHeader {...props} />
          </Container>
        );
      }}
      combinations={{
        onHeaderClick: [() => null],
        variant: ['basic', 'disabled', 'active'],
        children: [<></>, undefined],
        primaryContent: [
          undefined,
          // eslint-disable-next-line react/jsx-key
          <Dropdown isSmall bordered variant="primary" placeholder="Value" value="Value">
            {() => <span />}
          </Dropdown>,
        ],
      }}
      columns={2}
      center
      groupBy="variant"
      isHidden={(props) =>
        (props.children === undefined && !!props.primaryContent) ||
        (props.variant === 'disabled' && !!props.primaryContent)
      }
    />
  ),
};

export default meta;
