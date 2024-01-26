import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';
import { useDismissable } from 'react-dismissable-layers';

import { ActionButtons, Menu, MENU_ITEM_MIN_HEIGHT, MenuItem } from '@/components/Navigation';
import { Portal, VirtualizedContent } from '@/components/Utility';
import { usePopperContext } from '@/contexts';
import { usePersistFunction } from '@/hooks';
import { useCachedValue } from '@/hooks/cache.hook';
import { useVirtualElementPopper } from '@/hooks/popper.hook';

import { addActionButtonContainer } from './SuggestionsMenu.css';
import type { BaseSuggestionsMenuItem, ISuggestionsMenu } from './SuggestionsMenu.interface';

export const SuggestionsMenu = <T extends BaseSuggestionsMenuItem>({
  search,
  onEdit,
  canEdit,
  onCreate,
  onSelect,
  formatter,
  canCreate: creatable,
  referenceNode,
  suggestionsMap,
  createButtonLabel = 'Create',
}: ISuggestionsMenu<T>): React.ReactElement => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const preventSetIndexRef = React.useRef(false);

  const [focusedIndex, setFocusedIndex] = React.useState<null | number>(0);

  const popper = useVirtualElementPopper(referenceNode, {
    strategy: 'fixed',
    placement: 'bottom-start',
    modifiers: [{ name: 'preventOverflow', options: { boundary: globalThis.document?.body } }],
  });
  const popperContext = usePopperContext();
  const dismissableRef = useCachedValue(popper.popperElement);

  const formattedSearch = React.useMemo(() => formatter?.(search) ?? search, [search, formatter]);

  const [items, itemsMapByName] = React.useMemo(() => {
    const items = Object.values(suggestionsMap ?? {});

    const sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));
    const itemsMapByName = Object.fromEntries(items.map((item) => [item.name, item] as const));
    return [sortedItems, itemsMapByName] as const;
  }, [suggestionsMap]);

  const itemsToRender = React.useMemo(() => {
    const lowercasedSearch = formattedSearch.toLowerCase();

    return items.filter((item) => !!item.name.toLowerCase().includes(lowercasedSearch));
  }, [items, formattedSearch]);

  const virtualizer = useVirtualizer({
    count: itemsToRender.length,
    estimateSize: () => MENU_ITEM_MIN_HEIGHT,
    getScrollElement: () => listRef.current,
  });

  const creationDisabled = !!itemsMapByName[formattedSearch];

  const handleCreate = async () => {
    if (creationDisabled) return;

    try {
      const newSuggestion = await onCreate?.(formattedSearch);

      if (!newSuggestion) return;

      onSelect(newSuggestion);
    } catch {
      // skip
    }
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const handleKeydown = usePersistFunction((event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      event.stopPropagation();

      let nextIndex: null | number;

      if (event.key === 'ArrowDown') {
        nextIndex = focusedIndex === null ? 0 : focusedIndex + 1;
      } else {
        nextIndex = focusedIndex === null ? itemsToRender.length - 1 : focusedIndex - 1;
      }

      if (nextIndex >= itemsToRender.length) {
        nextIndex = creatable ? null : 0;
      } else if (nextIndex < 0) {
        nextIndex = creatable ? null : itemsToRender.length - 1;
      }

      if (nextIndex !== null) {
        preventSetIndexRef.current = true;
        virtualizer.scrollToIndex(nextIndex, { align: 'auto' });
      }

      setFocusedIndex(nextIndex);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      const item = focusedIndex === null ? null : itemsToRender[focusedIndex];

      if (creatable && focusedIndex === null) {
        handleCreate();
      } else if (item) {
        onSelect(item);
      }
    }
  });

  useDismissable(true, { ref: dismissableRef });

  React.useEffect(() => setFocusedIndex(creatable && itemsToRender.length === 0 ? null : 0), [formattedSearch]);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      preventSetIndexRef.current = false;
    });

    return () => cancelAnimationFrame(frame);
  }, [focusedIndex]);

  React.useEffect(() => {
    const observer = new MutationObserver(() => popper.forceUpdate?.());

    observer.observe(referenceNode, {
      subtree: true,
      childList: true,
      characterData: true,
      characterDataOldValue: true,
    });

    return () => observer.disconnect();
  }, [referenceNode, popper.forceUpdate]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeydown, { capture: true });

    return () => {
      document.removeEventListener('keydown', handleKeydown, { capture: true });
    };
  }, []);

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <Portal portalNode={popperContext.portalNode}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={popper.setPopperElement}
        style={{ ...popper.styles.popper, zIndex: popperContext.zIndex }}
        onMouseDown={(event) => event.preventDefault()}
        {...popper.attributes.popper}
      >
        <Menu
          width={itemsToRender.length ? undefined : 'fit-content'}
          listRef={listRef}
          minWidth={!itemsToRender.length ? 'fit-content' : undefined}
          maxHeight={310}
          actionButtons={
            creatable && (
              <ActionButtons
                className={addActionButtonContainer({
                  empty: !itemsToRender.length,
                  searched: !!formattedSearch || !itemsToRender.length,
                })}
                firstButton={
                  formattedSearch || !itemsToRender.length ? (
                    <>
                      {formattedSearch ? (
                        <Menu.CreateItem
                          label={formattedSearch}
                          onClick={handleCreate}
                          disabled={creationDisabled}
                          isHovering={focusedIndex === null}
                          onMouseEnter={() => setFocusedIndex(null)}
                        />
                      ) : (
                        <MenuItem
                          label={createButtonLabel}
                          onClick={handleCreate}
                          disabled={creationDisabled}
                          isHovering={focusedIndex === null}
                          onMouseEnter={() => setFocusedIndex(null)}
                        />
                      )}
                    </>
                  ) : (
                    <ActionButtons.Button
                      label={createButtonLabel}
                      onClick={handleCreate}
                      disabled={creationDisabled}
                      isHovering={focusedIndex === null}
                      onMouseEnter={() => setFocusedIndex(null)}
                    />
                  )
                }
              />
            )
          }
        >
          {!!itemsToRender.length && (
            <VirtualizedContent start={virtualItems[0]?.start ?? 0} totalSize={virtualizer.getTotalSize()}>
              {virtualItems.map(
                (virtualRow) =>
                  itemsToRender[virtualRow.index] && (
                    <MenuItem.WithButton
                      key={virtualRow.key}
                      ref={virtualizer.measureElement}
                      label={itemsToRender[virtualRow.index].name}
                      onClick={() => onSelect(itemsToRender[virtualRow.index])}
                      suffixButton={
                        canEdit && onEdit
                          ? { iconName: 'EditS', onClick: () => onEdit(itemsToRender[virtualRow.index]) }
                          : undefined
                      }
                      isHovering={focusedIndex === virtualRow.index}
                      data-index={virtualRow.index}
                      searchValue={formattedSearch}
                      onMouseEnter={() => !preventSetIndexRef.current && setFocusedIndex(virtualRow.index)}
                      prefixIconName={itemsToRender[virtualRow.index].iconName}
                    />
                  )
              )}
            </VirtualizedContent>
          )}
        </Menu>
      </div>
    </Portal>
  );
};
