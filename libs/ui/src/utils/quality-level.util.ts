export type QualityLevel = 'low' | 'ok' | 'good' | 'great';

export const DEFAULT_THREHSOLDS: Record<number, QualityLevel> = {
  25: 'low',
  50: 'ok',
  75: 'good',
  100: 'great',
};

export const getQualityLevel = (value: number): QualityLevel => {
  if (value <= 0) return 'low' as QualityLevel;

  return Object.entries(DEFAULT_THREHSOLDS).reduce<QualityLevel>((acc, [threshold, label]) => {
    if (value >= Number(threshold)) return label;

    return acc;
  }, 'low');
};
