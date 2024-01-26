import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DragButton, SquareButton, Text } from '@/components';
import { Box } from '@/main';

import { SortableList } from './SortableList.component';
import type { ISortableList } from './SortableList.interface';

const list = ['neque', 'vitae tempus', 'quam pellentesque', 'nec nam aliquam', 'sem et tortor'];

const meta: Meta<typeof SortableList<string>> = {
  title: 'Utility/Sortable List',
  component: SortableList<string>,
};

export default meta;

type Story = StoryObj<typeof SortableList<string>>;

const SortableListExample = (props: ISortableList<string>) => {
  const [items, setItems] = useState(props.items);

  return (
    <Box width="320px" direction="column">
      <SortableList
        {...props}
        items={items}
        onItemsReorder={(newItems) => {
          setItems(newItems);
        }}
      />
    </Box>
  );
};

export const Examples: Story = {
  args: {
    items: list,
    renderItem: ({ ref, item, styles, dragContainerProps }) => (
      <DragButton.Container {...dragContainerProps} ref={ref} variant="section">
        <Box width="100%" pl={25} align="center" justify="space-between" direction="row" style={styles}>
          <Text overflow>{item}</Text>
          <SquareButton variant="light" iconName="Minus" size="medium" onClick={() => null} />
        </Box>
      </DragButton.Container>
    ),
    getItemKey: (item) => item,
  },
  render: (args) => <SortableListExample {...args} />,
};
