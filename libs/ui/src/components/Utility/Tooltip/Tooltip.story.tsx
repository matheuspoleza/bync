import type { Meta, StoryObj } from '@storybook/react';

import { VideoPlayer } from '@/components/Media/VideoPlayer';
import { Text } from '@/components/Text/Text.component';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { Box } from '../Box/Box.component';
import { TooltipButton } from './components/TooltipButton';
import { TooltipCaption } from './components/TooltipCaption';
import { TooltipCodeBlock } from './components/TooltipCodeBlock';
import { TooltipMedia } from './components/TooltipMedia';
import { TooltipOverflow } from './components/TooltipOverflow';
import { Tooltip } from './Tooltip.component';
import type { ITooltip } from './Tooltip.interface';

type Story = StoryObj<typeof Tooltip>;

const TooltipOverflowComponent = () => {
  return (
    <Box width="200px" px={10}>
      <TooltipOverflow
        referenceElement={({ ref, onOpen, onClose }) => (
          <Text
            ref={ref}
            style={{ cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
          >
            Content Content Content Content Content Content Content Content Content Content Content Content Content
            Content Content Content Content Content Content Content Content Content Content Content Content Content
            Content Content Content Content Content Content Content Content Content Content Content Content Content
            Content Content Content Content Content Content Content Content Content Content Content Content Content
            Content Content
          </Text>
        )}
      >
        {() => (
          <Text>
            Content Content Content Content Content Content Content Content Content Content Content Content Content
            Content Content Content Content Content Content Content Content Content Content Content Content Content
            Content Content Content Content Content Content Content Content Content Content Content Content Content
            Content Content Content Content Content Content Content Content Content Content Content Content Content
            Content Content
          </Text>
        )}
      </TooltipOverflow>
    </Box>
  );
};

const meta: Meta<typeof Tooltip> = {
  title: 'Utility/Tooltip',
  component: Tooltip,
  args: {},
};

export const WithCodeBlocks: Story = {
  args: {
    placement: 'right',
    px: 0,
    py: 0,
    referenceElement: ({ onToggle, ref }) => (
      <Text onMouseEnter={onToggle} onMouseLeave={onToggle} ref={ref} style={{ width: '66px', cursor: 'pointer' }}>
        Hover me
      </Text>
    ),
    children: () => (
      <Box direction="column">
        <Box px={16} pt={10} pb={8}>
          <Text variant="caption">Directly write a boolean expression:</Text>
        </Box>

        <TooltipCodeBlock>
          <Text variant="code">{'{sessions} > 1'}</Text>
        </TooltipCodeBlock>
        <Box px={16} pt={10} pb={8}>
          <Text variant="caption">At runtime, the expression will be evaluated inside an ‘if’ statement:</Text>
        </Box>
        <TooltipCodeBlock>
          <Text variant="code">{'if (sessions > 1) {'}</Text>
          <Text variant="code" style={{ display: 'block' }}>
            {'\n \n // activate additional path'}
          </Text>
        </TooltipCodeBlock>
      </Box>
    ),
  },
};

export const Base: Story = {
  args: {
    width: 220,
    placement: 'right',
    referenceElement: ({ onToggle, ref }) => (
      <Text onMouseEnter={onToggle} onMouseLeave={onToggle} ref={ref} style={{ width: '66px', cursor: 'pointer' }}>
        Hover me
      </Text>
    ),
    children: () => (
      <Box direction="column">
        <Text variant="caption">
          Content Content Content Content Content Content Content Content Content Content Content Content
        </Text>
      </Box>
    ),
  },
};

export const WithShift: Story = {
  args: {
    width: 120,
    hasArrowShift: true,
    placement: 'left-start',
    referenceElement: ({ onToggle, ref }) => (
      <Box py={100} pl={300} width={400}>
        <Text
          variant="h2"
          ref={ref}
          onMouseEnter={onToggle}
          style={{ width: '100px', display: 'block', cursor: 'pointer' }}
        >
          Hover me
        </Text>
      </Box>
    ),
    children: () => (
      <Box direction="column">
        <Text variant="caption">
          Content Content Content Content Content Content Content Content Content Content Content Content
        </Text>
      </Box>
    ),
  },
};

export const NoSize: Story = {
  args: {
    placement: 'bottom',
    referenceElement: ({ onToggle, ref }) => (
      <Text onMouseEnter={onToggle} onMouseLeave={onToggle} ref={ref} style={{ width: '66px', cursor: 'pointer' }}>
        Hover me
      </Text>
    ),
    children: () => (
      <Box direction="column">
        <Text variant="caption">
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content Content Content Content
          Content Content Content Content Content Content Content Content Content Content
        </Text>
      </Box>
    ),
  },
};

export const NoArrow: Story = {
  args: {
    placement: 'right',
    hasArrow: false,
    referenceElement: ({ onToggle, ref }) => (
      <Text onMouseEnter={onToggle} onMouseLeave={onToggle} ref={ref} style={{ width: '66px', cursor: 'pointer' }}>
        Hover me
      </Text>
    ),
    children: () => (
      <Box direction="column">
        <Text variant="caption">Content</Text>
      </Box>
    ),
  },
};

export const WithDelay: Story = {
  args: {
    placement: 'right',
    hasArrow: false,
    delay: [500, 0],
    referenceElement: ({ onOpen, onClose, ref }) => {
      return (
        <Text ref={ref} onMouseEnter={onOpen} onMouseLeave={onClose} style={{ width: '66px', cursor: 'pointer' }}>
          Hover me
        </Text>
      );
    },
    children: () => (
      <Box direction="column">
        <Text variant="caption">Content</Text>
      </Box>
    ),
  },
};

export const WithButton: Story = {
  args: {
    width: 200,
    inline: true,
    placement: 'right-start',
    referenceElement: ({ onToggle, ref, popper }) => (
      <Text onMouseEnter={onToggle} onMouseLeave={onToggle} ref={ref} style={{ width: '66px', cursor: 'pointer' }}>
        {popper}
        Hover me
      </Text>
    ),
    children: () => (
      <>
        <TooltipCaption>Content</TooltipCaption>
        <TooltipButton label="label" onClick={() => null} />
      </>
    ),
  },
};

const MediaContent: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <TooltipMedia mb={12}>
        <VideoPlayer
          // eslint-disable-next-line no-secrets/no-secrets
          src="https://joy1.videvo.net/videvo_files/video/free/2013-08/large_watermarked/hd0992_preview.mp4"
          width={280}
          controls
          cover
        />
      </TooltipMedia>
      <TooltipCaption>Content</TooltipCaption>
      {children}
      <TooltipButton onClick={() => null} label="Learn" />
    </>
  );
};

export const WithMedia: Story = {
  args: {
    placement: 'right',
    hasArrow: false,
    width: 280,
    pt: 0,
    pl: 16,
    inline: true,
    referenceElement: ({ onToggle, ref, popper }) => (
      <Text onMouseEnter={onToggle} ref={ref} style={{ width: '66px' }}>
        Hover me
        {popper}
      </Text>
    ),
    children: () => <MediaContent />,
  },
};

export const WithMediaAndTextContent: Story = {
  args: {
    placement: 'right',
    hasArrow: false,
    width: 280,
    pt: 0,
    px: 16,
    inline: true,
    referenceElement: ({ onToggle, ref, popper }) => (
      <Text onMouseEnter={onToggle} ref={ref} style={{ width: '66px' }}>
        Hover me
        {popper}
      </Text>
    ),
    children: () => (
      <MediaContent>
        <Text variant="caption">Some description of the video</Text>
        <Text variant="caption" style={{ marginBottom: '12px' }}>
          More description
        </Text>
      </MediaContent>
    ),
  },
};

export const Overflow: Story = {
  render: () => <TooltipOverflowComponent />,
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ITooltip>
      componentName={Tooltip.name}
      Component={(props) => (
        <Tooltip
          referenceElement={({ ref, onToggle }) => (
            <Text onMouseEnter={onToggle} ref={ref} style={{ cursor: 'pointer' }}>
              Hover me
            </Text>
          )}
          {...props}
        >
          {props.children}
        </Tooltip>
      )}
      combinations={{
        placement: ['bottom', 'top', 'left', 'right'],
        hasArrow: [true, false],
        children: [
          () => (
            <>
              <Box direction="column">
                <Text variant="caption">
                  Content Content Content Content Content Content Content Content Content Content Content Content
                  Content Content Content Content Content Content Content Content Content Content Content Content
                  Content Content Content Content Content Content Content Content Content Content Content Content
                  Content Content Content Content Content Content Content Content Content Content Content Content
                  Content Content Content Content Content Content
                </Text>
              </Box>
            </>
          ),
        ],
        width: [200],
        variant: ['basic', 'alert', 'success'],
        height: [200],
      }}
      columns={1}
      center
      groupBy="placement"
    />
  ),
};

export const ExamplesOfVariants: Story = {
  render: () => (
    <CartesianProduct<ITooltip>
      componentName={Tooltip.name}
      Component={(props) => (
        <Tooltip
          referenceElement={({ ref, onToggle }) => (
            <Text onMouseEnter={onToggle} ref={ref} style={{ cursor: 'pointer' }}>
              Hover me
            </Text>
          )}
          {...props}
        >
          {props.children}
        </Tooltip>
      )}
      combinations={{
        placement: ['right'],
        children: [
          () => (
            <>
              <Box direction="column">
                <Text variant="caption">Content</Text>
              </Box>
            </>
          ),
        ],

        variant: ['basic', 'alert', 'success'],
      }}
      columns={1}
      center
      groupBy="variant"
    />
  ),
};

export const ExamplesOfPlacements: Story = {
  render: () => (
    <CartesianProduct<ITooltip>
      componentName={Tooltip.name}
      Component={(props) => (
        <Tooltip
          referenceElement={({ ref, onToggle }) => (
            <Text onMouseEnter={onToggle} ref={ref} style={{ cursor: 'pointer' }}>
              Hover me
            </Text>
          )}
          {...props}
        >
          {props.children}
        </Tooltip>
      )}
      combinations={{
        placement: ['right', 'left', 'top', 'bottom'],
        children: [
          () => (
            <>
              <Box direction="column">
                <Text variant="caption">Content</Text>
              </Box>
            </>
          ),
        ],

        variant: ['basic'],
      }}
      columns={1}
      center
      groupBy="placement"
    />
  ),
};

export default meta;
