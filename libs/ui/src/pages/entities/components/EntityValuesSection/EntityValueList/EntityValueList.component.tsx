import { SquareButton } from '@/components/Buttons/SquareButton';
import type { ITwoLineInput } from '@/components/Inputs/Input/TwoLineInput';
import { TwoLineInput } from '@/components/Inputs/Input/TwoLineInput';
import { FocusIndicatorContainer } from '@/components/Other/FocusIndicator/FocusIndicatorContainer/FocusIndicatorContainer.component';
import { CollapsibleList } from '@/components/Section';
import { Box } from '@/components/Utility/Box';
import { Scroll } from '@/components/Utility/Scroll';
import { GenerateButtonMenu } from '@/pages/entities/modals/components/GenerateButton';

import { listFooterStyles } from './EntityValueList.css';

const ITEMS_LIMIT = 5;
export interface IValueEntry {
  id: string;
  firstLine: {
    value: string;
  };
  secondLine: {
    value: string;
  };
}
export interface IEditorValueList {
  valueEntries: IValueEntry[];
  onDeleteValue: (id: string) => void;
  onValueEntryChange: (item: IValueEntry, patch: Partial<IValueEntry>) => void;

  error?: boolean;
  isUploading?: boolean;
  onAddValue?: () => void;
  onGenerate?: (count: number) => void;
  firstLineProps?: Partial<ITwoLineInput['firstLineProps']>;
  secondLineProps?: Partial<ITwoLineInput['secondLineProps']>;
}

export const EntityValueList: React.FC<IEditorValueList> = ({
  valueEntries,
  error: valueError,
  isUploading,
  onValueEntryChange,
  onDeleteValue,
  onAddValue,
  firstLineProps,
  secondLineProps,
  onGenerate,
}) => {
  const onValueKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    if (!value) return;

    if (event.key === 'Enter') {
      onAddValue?.();
    }
  };
  return (
    <Scroll overflow="scroll">
      <CollapsibleList
        collapseLabel="values"
        stickyFooter={true}
        estimatedItemSize={53}
        items={valueEntries}
        itemsLimit={ITEMS_LIMIT}
        footerClassName={listFooterStyles}
        getItemKey={() => 0}
        renderItem={({ item, virtualizer, virtualItem }) => (
          <Box
            pt={9}
            pb={7}
            px={0}
            height="53px"
            ref={virtualizer.measureElement}
            key={item.id}
            data-index={virtualItem.index}
          >
            <FocusIndicatorContainer key={item.id} error={valueError}>
              <Box pl={22} align="center" justify="space-between" direction="row">
                <TwoLineInput
                  firstLineProps={{
                    autoFocus: true,
                    onKeyPress: onValueKeyPress,
                    placeholder: 'Enter entity value',
                    disabled: isUploading,
                    value: item.firstLine.value,
                    onValueChange: (line) => onValueEntryChange(item, { firstLine: { value: line } }),
                    ...firstLineProps,
                  }}
                  secondLineProps={{
                    onKeyPress: onValueKeyPress,
                    placeholder: 'Add synonyms, comma separated',
                    disabled: isUploading,
                    value: valueError ? 'Custom entities require at least one value.' : item.secondLine.value,
                    error: valueError,
                    onValueChange: (line) => onValueEntryChange(item, { secondLine: { value: line } }),
                    ...secondLineProps,
                  }}
                />
                <Box mr={16} ml={12}>
                  <SquareButton
                    variant="light"
                    iconName="Minus"
                    size="medium"
                    onClick={() => onDeleteValue(item.id)}
                    disabled={isUploading}
                  />
                </Box>
              </Box>
            </FocusIndicatorContainer>
          </Box>
        )}
      />
      <Box px={16} pb={16} pt={8}>
        <GenerateButtonMenu isDisabled={isUploading} onOptionClick={onGenerate} />
      </Box>
    </Scroll>
  );
};
