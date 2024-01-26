import { clsx } from '@bync/style';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Menu, MenuItem } from '@/components/Navigation/Menu';
import { ActionButtons } from '@/components/Navigation/Menu/ActionButtons';
import { Chip } from '@/components/Other/Chip';
import { Divider } from '@/components/Other/Divider';
import type { IBox } from '@/components/Utility/Box';
import { Box } from '@/components/Utility/Box';
import { useOutsideClickHandler } from '@/hooks/useOutsideClickHandler';
import type { FormControlProps } from '@/types';

import {
  chipsInputRecipe,
  chipStyles,
  inputRecipe,
  invisibleInput,
  menuStyles,
  noInput,
  placeholderStyles,
} from './ChipsInput.css';
import { isChipUnique, isOnNewLine, trimChip } from './ChipsInput.util';

export interface IChipsInput extends IBox, FormControlProps<string[]> {
  className?: string;
  value: string[];
  suggestions?: string[];
}

export const ChipsInput: React.FC<IChipsInput> = ({
  className,
  value: initialChips,
  width,
  suggestions: initialMenuItems,
  onValueChange,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [chips, setChips] = useState<string[]>(initialChips ?? []);
  const [isInputHidden, setIsInputHidden] = useState(false);

  const [suggestions, setSuggestions] = useState<string[]>(
    initialMenuItems?.filter((item) => !chips.includes(item)) ?? []
  );

  useOutsideClickHandler(containerRef, () => setIsFocused(false));

  const hasPlaceholder = useMemo(() => !currentValue && !chips.length, [currentValue, chips, isFocused]);

  // removes input element from an empty line on blur
  useEffect(() => {
    if (!isFocused && isOnNewLine(inputRef, containerRef)) {
      setIsInputHidden(true);
    }
  }, [inputRef, containerRef, isFocused]);

  // TODO this is the source of ambiguity of focus states
  useEffect(() => {
    const handleFocus = () => {
      if (document.activeElement === inputRef.current) {
        setIsFocused(true);
      } else {
        // setIsFocused(false);
      }

      if (isInputHidden) {
        setIsInputHidden(false);
      }
    };

    document.addEventListener('focus', handleFocus, true);

    return () => {
      document.removeEventListener('focus', handleFocus, true);
    };
  }, [inputRef.current, isInputHidden]);

  const filteredSuggestions = useMemo(() => {
    if (!currentValue || !currentValue.trim()) {
      return suggestions;
    }
    return suggestions.filter((item) => item.toLowerCase().includes(currentValue.toLowerCase()));
  }, [suggestions, currentValue]);

  const addNewChip = (value: string) => {
    if (!value.trim() || !isChipUnique(value, chips)) return;
    setChips([...chips, value.trim()]);
    onValueChange?.([...chips, value.trim()]);
    setCurrentValue('');
    setIsFocused(true);

    if (suggestions.includes(value)) {
      setSuggestions(suggestions.filter((item) => item !== value));
    }
  };

  const onContainerClick = () => {
    inputRef.current?.focus();
  };

  const isMenuOpen = useMemo(() => {
    const hasCurrentValue = isFocused && !filteredSuggestions.length && currentValue.length;
    const hasSuggestions = isFocused && filteredSuggestions.length;
    return hasCurrentValue || hasSuggestions;
  }, [filteredSuggestions, isFocused, currentValue]);

  const menu = useMemo(
    () => (
      <Menu
        width={width ?? 302}
        className={menuStyles}
        numberOfItemsToShow={8}
        actionButtons={
          !currentValue && filteredSuggestions.length ? (
            <ActionButtons firstButton={<ActionButtons.Button label="Manage tags" onClick={() => null} />} />
          ) : undefined
        }
      >
        {filteredSuggestions.length
          ? filteredSuggestions.map((item, index) => (
              <MenuItem label={item} key={index} onClick={() => addNewChip(item)} maxWidth={270} />
            ))
          : null}
        {currentValue.length && !filteredSuggestions.includes(currentValue) ? (
          <>
            {filteredSuggestions.length ? <Divider fullWidth /> : null}
            <MenuItem label={`Add '${currentValue}'`} onClick={() => addNewChip(currentValue)} />
          </>
        ) : null}
      </Menu>
    ),
    [chips, suggestions, currentValue]
  );

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        addNewChip(currentValue);
        setCurrentValue('');
      } else if (!currentValue && (e.key === 'Delete' || e.key === 'Backspace')) {
        setChips(chips.slice(0, -1));
      }
    },
    [chips, currentValue]
  );

  const onRemove = (value: string) => {
    setChips(chips.filter((item) => item !== value));
  };

  return (
    <Box
      {...props}
      className={className}
      width={width}
      direction="column"
      ref={containerRef}
      onClick={onContainerClick}
    >
      <Box className={chipsInputRecipe({ isFocused, hasChildren: !!chips.length })} px={4} direction="column">
        {hasPlaceholder ? (
          <Box className={placeholderStyles} pl={12}>
            Search tags or add new
          </Box>
        ) : null}

        {chips.map((item, index) => (
          <Chip
            className={chipStyles}
            key={`${item}${index}`}
            value={trimChip(item)}
            onDelete={() => onRemove(item)}
            mt={4}
          />
        ))}

        <input
          ref={inputRef}
          onClick={() => setIsFocused(true)}
          className={clsx(inputRecipe({ hasTags: !!chips.length }), {
            [invisibleInput]: !currentValue && !chips.length,
            [noInput]: isInputHidden,
          })}
          value={currentValue}
          onKeyDown={onKeyPress}
          onChange={(event) => {
            setCurrentValue(event.target.value);
          }}
        />
      </Box>
      {isMenuOpen ? menu : null}
    </Box>
  );
};
