import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';

import { SearchInput } from '@/components/Inputs';
import { Box } from '@/components/Utility/Box/Box.component';
import { GroupTitle } from '@/storybook/GroupTitle';

import { Header } from './index';
import type { IHeader } from './types';

type Story = StoryObj<typeof Header>;

const meta: Meta<typeof Header> = {
  title: 'Navigation/Header',
  component: Header,
};

export default meta;

const HeaderStory: React.FC<React.PropsWithChildren & { title?: string } & IHeader> = ({
  children,
  title,
  ...props
}) => {
  return (
    <Box direction="column" gap={8}>
      {title && <GroupTitle group={title} />}
      <Header {...props}>
        <Box gap={8} width="100%">
          {children}
        </Box>
      </Header>
    </Box>
  );
};

export const Surface: Story = {
  render: () => (
    <Box direction="column">
      <HeaderStory title="Default" />

      <HeaderStory title="Primary Navigation" kind="primaryNavigation" />

      <HeaderStory title="Secondary Navigation" kind="secondaryNavigation" />
    </Box>
  ),
};

export const WithButtons: Story = {
  render: () => {
    return (
      <Box direction="column">
        <HeaderStory title="notification" variant="buttons">
          <Header.Button.Notification count={1} />
        </HeaderStory>

        <HeaderStory title="navigation">
          <Header.Button.Navigation />
        </HeaderStory>

        <HeaderStory title="with icons" variant="buttons">
          <Header.Button.IconPrimary iconName="PlayS" />
          <Header.Button.IconSecondary iconName="Settings" />
        </HeaderStory>

        <HeaderStory title="with labels" variant="buttons">
          <Header.Button.Secondary label="Share" />
          <Header.Button.Primary label="Add data source" />
        </HeaderStory>
      </Box>
    );
  },
};

const WithSearchInputComponent = () => {
  const [value, setValue] = useState('');
  return (
    <HeaderStory variant="search">
      <SearchInput variant="dark" placeholder="Search for any content..." value={value} onValueChange={setValue} />
    </HeaderStory>
  );
};

export const WithSearchInput: Story = {
  render: () => WithSearchInputComponent(),
};

export const WithSections: Story = {
  render: () => {
    return (
      <Box direction="column">
        <Box direction="column" gap={8}>
          <GroupTitle group="all sections" />

          <Header>
            <Header.Section.Left>
              <Header.Button.Secondary label="left section" />

              <Header.Section.LeftActions>
                <Header.Button.Secondary label="left action 1" />
                <Header.Button.Secondary label="left action 2" />
              </Header.Section.LeftActions>
            </Header.Section.Left>

            <Header.Section.Center>
              <Header.Button.Secondary label="center section" />
            </Header.Section.Center>

            <Header.Section.Right>
              <Header.Button.Secondary label="right section" />

              <Header.Section.RightActions>
                <Header.Button.Secondary label="right action 1" />
                <Header.Button.Secondary label="right action 2" />
              </Header.Section.RightActions>
            </Header.Section.Right>
          </Header>
        </Box>

        <Box direction="column" gap={8}>
          <GroupTitle group="no center" />

          <Header>
            <Header.Section.Left>
              <Header.Button.Secondary label="left section" />
            </Header.Section.Left>

            <Header.Section.Right>
              <Header.Button.Secondary label="right section" />
            </Header.Section.Right>
          </Header>
        </Box>

        <Box direction="column" gap={8}>
          <GroupTitle group="center" />

          <Header>
            <Header.Section.Left>
              <Header.Button.Secondary label="left section" />
            </Header.Section.Left>

            <Header.Section.Center>
              <Header.Button.Secondary label="center section" />
            </Header.Section.Center>

            <Header.Section.Right>
              <Header.Button.Secondary label="right section" />
            </Header.Section.Right>
          </Header>
        </Box>

        <Box direction="column" gap={8}>
          <GroupTitle group="right actions" />

          <Header>
            <Header.Section.Left>
              <Header.Button.Secondary label="left section" />
            </Header.Section.Left>

            <Header.Section.Right>
              <Header.Button.Secondary label="right section" />

              <Header.Section.RightActions>
                <Header.Button.Secondary label="right action 1" />
                <Header.Button.Secondary label="right action 2" />
              </Header.Section.RightActions>
            </Header.Section.Right>
          </Header>
        </Box>

        <Box direction="column" gap={8}>
          <GroupTitle group="left actions" />

          <Header>
            <Header.Section.Left>
              <Header.Button.Secondary label="left section" />

              <Header.Section.LeftActions>
                <Header.Button.Secondary label="left action 1" />
                <Header.Button.Secondary label="left action 2" />
              </Header.Section.LeftActions>
            </Header.Section.Left>

            <Header.Section.Right>
              <Header.Button.Secondary label="right section" />
            </Header.Section.Right>
          </Header>
        </Box>
      </Box>
    );
  },
};

const ExampleComponent = () => {
  const [firstSearch, setFirstSearch] = useState('');
  const [secondSearch, setSecondSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  return (
    <Box direction="column" gap={48}>
      <Header variant="buttons">
        <Header.Section.Left>
          <Header.Button.Navigation />

          <Header.Section.LeftActions>
            <Header.Button.Notification count={1} />
          </Header.Section.LeftActions>
        </Header.Section.Left>

        <Header.Section.Right>
          <Header.AvatarList
            list={[
              { name: 'A', variant: 'darkHavelock' },
              { name: 'H', variant: 'darkFern' },
            ]}
            onButtonClick={() => null}
          />

          <Header.Section.RightActions>
            <Header.Button.Secondary label="Share" />
            <Header.Button.Primary label="Run" />
          </Header.Section.RightActions>
        </Header.Section.Right>
      </Header>

      <Header variant="search">
        <Header.Section.Left>
          <SearchInput placeholder="Search" ref={searchRef} value={firstSearch} onValueChange={setFirstSearch} />
        </Header.Section.Left>

        <Header.Section.Right>
          <Header.AvatarList
            list={[
              { name: 'A', variant: 'darkHavelock' },
              { name: 'M', variant: 'darkHibiscus' },
              { name: 'H', variant: 'darkFern' },
              { name: 'C', variant: 'dark' },
            ]}
            onButtonClick={() => null}
          />

          <Header.Section.RightActions>
            <Header.Button.IconSecondary iconName="Settings" />
            <Header.Button.Secondary label="Label" />
            <Header.Button.Primary label="Label" />
          </Header.Section.RightActions>
        </Header.Section.Right>
      </Header>

      <Header variant="search">
        <Header.Section.Left>
          <SearchInput placeholder="Search for any content..." value={secondSearch} onValueChange={setSecondSearch} />
        </Header.Section.Left>

        <Header.Section.Right>
          <Header.AvatarList
            list={[
              { name: 'A', variant: 'darkHavelock' },
              { name: 'M', variant: 'darkHibiscus' },
              { name: 'H', variant: 'darkFern' },
              { name: 'C', variant: 'dark' },
            ]}
            onButtonClick={() => null}
          />

          <Header.Section.RightActions>
            <Header.Button.IconSecondary iconName="Settings" />
            <Header.Button.Secondary label="Share" />
            <Header.Button.Primary label="Add data source" />
          </Header.Section.RightActions>
        </Header.Section.Right>
      </Header>
    </Box>
  );
};

export const Examples: Story = {
  render: () => ExampleComponent(),
};
