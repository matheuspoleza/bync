import { useEffect, useMemo, useRef, useState } from 'react';

import { Menu } from '@/components/Navigation/Menu/Menu.component';
import { MenuItem } from '@/components/Navigation/Menu/MenuItem';
import { usePersistFunction } from '@/hooks';
import { useOutsideClickHandler } from '@/hooks/useOutsideClickHandler';

import { getRelevantAutoSuggestions, getVariableEntityAutoSugguestions } from '../utils/keyword-matcher';
import { codeSuggestionPopoverModifier, codeSuggestionsPopoverStyles } from './CodeSuggestionsPopover.css';
import { positionMenu } from './get-position-from-element';
import type { IAutosuggestion, ICodeSuggestionsPopover } from './types';

export const CodeSuggestionsPopover: React.FC<ICodeSuggestionsPopover> = ({
  languageKeywords,
  variableEntities,
  onSuggestionClick,
  targetElement,
  doesWordStartWithBracket,
  currentWord,
  close,
}) => {
  const autosuggestions: IAutosuggestion[] = useMemo(() => {
    return doesWordStartWithBracket
      ? getVariableEntityAutoSugguestions(currentWord, variableEntities)
      : getRelevantAutoSuggestions(currentWord, languageKeywords);
  }, [currentWord, variableEntities, languageKeywords, doesWordStartWithBracket]);

  const [focusedIndex, setFocusedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClickHandler(containerRef, () => {
    close();
  });
  const menuItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isOpen = !!autosuggestions.length;

  const handleKeydown = usePersistFunction((event: globalThis.KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      event.stopPropagation();
      let nextIndex: null | number;
      if (event.key === 'ArrowDown') {
        nextIndex = focusedIndex + 1;
      } else {
        nextIndex = focusedIndex - 1;
      }
      scrollIntoView(nextIndex);
      if (nextIndex >= autosuggestions.length) {
        nextIndex = 0;
      } else if (nextIndex < 0) {
        nextIndex = autosuggestions.length - 1;
      }
      setFocusedIndex(nextIndex);
    } else if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      event.stopPropagation();
      onSuggestionClick(autosuggestions[focusedIndex].value);
    }
  });

  const scrollIntoView = (nextIndex: number) => {
    if (menuItemRefs.current[nextIndex]) {
      menuItemRefs.current[nextIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeydown, { capture: true });
    }
    return () => {
      document.removeEventListener('keydown', handleKeydown, { capture: true });
    };
  }, [handleKeydown, autosuggestions, isOpen, menuItemRefs.current]);

  const targetPosition = positionMenu(targetElement, containerRef.current);

  return (
    <span
      ref={containerRef}
      style={{ top: targetPosition.top, left: targetPosition.left }}
      className={codeSuggestionsPopoverStyles}
    >
      {isOpen && (
        <>
          {targetPosition.top !== 0 && targetPosition.left !== 0 && (
            <Menu numberOfItemsToShow={8}>
              {autosuggestions.map((match, index) => {
                return (
                  <MenuItem
                    isHovering={focusedIndex === index ? true : undefined}
                    className={codeSuggestionPopoverModifier}
                    onClick={() => onSuggestionClick(match.value)}
                    key={`${match.label.toString()}--${index}`}
                    ref={(menuItemRef) => {
                      menuItemRefs.current[index] = menuItemRef;
                    }}
                    label={match.label}
                  />
                );
              })}
            </Menu>
          )}
        </>
      )}
    </span>
  );
};
