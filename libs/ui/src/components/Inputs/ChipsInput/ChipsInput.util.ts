import type { RefObject } from 'react';

const THRESHOLD = 5;

export const isChipUnique = (value: string, chips: string[]) => {
  return !chips.includes(value);
};

export const trimChip = (value: string, maxLength = 24) => {
  if (value.length > maxLength) {
    const midpoint = Math.floor(maxLength / 2);
    const start = value.slice(0, midpoint - 1);
    const end = value.slice(value.length - (midpoint - 1));
    return `${start}...${end}`;
  }
  return value.slice(0, maxLength);
};

export const isOnNewLine: (
  elementRef: RefObject<HTMLInputElement | null>,
  containerRef: RefObject<HTMLDivElement | null>
) => boolean = (elementRef, containerRef) => {
  if (!elementRef?.current || !containerRef?.current) return false;

  return (
    Math.abs(elementRef.current.getBoundingClientRect().x - containerRef.current.getBoundingClientRect().x) ===
    THRESHOLD
  );
};
