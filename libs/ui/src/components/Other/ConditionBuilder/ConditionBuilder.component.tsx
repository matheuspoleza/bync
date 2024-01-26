import { TabGroup } from '@/components/Navigation/TabGroup';

import type { IBox } from '../../Utility/Box';
import { Box } from '../../Utility/Box';

export enum ConditionBuilderMatchType {
  ALL = 0,
  ANY = 1,
}

export interface IConditionBuilder extends IBox {
  onTabChange: (index: number) => void;
  headerButtons: React.ReactNode;
  activeTab?: number;
  testID?: string;
}

export const ConditionBuilder: React.FC<IConditionBuilder> = ({
  testID,
  activeTab = ConditionBuilderMatchType.ALL,
  children,
  headerButtons,
  onTabChange,
}) => {
  const tabs = [
    { label: 'Match all', index: ConditionBuilderMatchType.ALL },
    { label: 'Match any', index: ConditionBuilderMatchType.ANY },
  ];

  return (
    <Box testID={testID} pb={11} direction="column">
      <Box pt={20} pl={24} pr={16} pb={8} justify="space-between" gap={12}>
        <TabGroup width="fill" onChange={onTabChange} activeTab={activeTab} size="default" tabs={tabs} />

        <Box gap={8} align="center">
          {headerButtons}
        </Box>
      </Box>
      <Box direction="column" justify="start">
        {children}
      </Box>
    </Box>
  );
};
