import type { Meta, StoryObj } from '@storybook/react';

import { Box, Modal, Section, SquareButton, Text } from '@/components';
import { Scroll } from '@/components/Utility/Scroll/Scroll.component';

import { CollapsibleList } from './CollapsibleList.component';
import { longList, shortList } from './fixtures';

const meta: Meta<typeof CollapsibleList<{ title: string }>> = {
  title: 'Section/Collapsible List',
  component: CollapsibleList<{ title: string }>,
};

export default meta;

type Story = StoryObj<typeof CollapsibleList<{ title: string }>>;

export const Base: Story = {
  args: {
    items: shortList,
    itemsLimit: 4,
    collapseLabel: 'sample phrases',
    estimatedItemSize: 35,
    renderItem: ({ item, virtualizer, virtualItem }) => (
      <Box
        py={2}
        ref={virtualizer.measureElement}
        align="center"
        justify="space-between"
        direction="row"
        data-index={virtualItem.index}
      >
        <Text>{item.title}</Text>
        <SquareButton variant="light" iconName="Minus" size="medium" onClick={() => null} />
      </Box>
    ),
  },
  render: (args) => {
    return (
      <Scroll width="320px">
        <CollapsibleList {...args} />
      </Scroll>
    );
  },
};

export const Examples: Story = {
  args: {
    items: longList,
    itemsLimit: 4,
    stickyFooter: true,
    collapseLabel: 'sample phrases',
    renderItem: ({ item, virtualizer, virtualItem }) => (
      <Box
        py={2}
        ref={virtualizer.measureElement}
        align="center"
        justify="space-between"
        direction="row"
        data-index={virtualItem.index}
      >
        <Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</Text>
        <SquareButton variant="light" iconName="Minus" size="medium" onClick={() => null} />
      </Box>
    ),
  },
  render: (args) => {
    return (
      <Modal.Container style={{ maxHeight: '95vh' }}>
        <Modal.Header title="Create entity" onClose={() => null} />

        <Scroll pt={16} mb={16}>
          <Section.Header.Container title="Sample Phrases">
            <Section.Header.Button iconName="List" onClick={() => null} />
            <Section.Header.Button iconName="Plus" onClick={() => null} />
          </Section.Header.Container>

          <Box pl={24} pr={15} direction="column">
            <CollapsibleList {...args} estimatedItemSize={36} />
          </Box>
        </Scroll>

        <Modal.Footer>
          <Modal.Footer.Button label="Create entity" onClick={() => null} variant="primary" />
        </Modal.Footer>
      </Modal.Container>
    );
  },
};
