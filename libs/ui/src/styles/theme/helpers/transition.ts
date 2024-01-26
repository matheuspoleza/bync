import type { PropertiesHyphen } from 'csstype';

import { animation } from '../tokens';

export interface TransitionOptions {
  duration: string;
  timingFunction: string;
}

export const createTransition =
  ({ duration: defaultDuration, timingFunction: defaultTimingFunction }: TransitionOptions) =>
  (
    properties: ReadonlyArray<keyof PropertiesHyphen>,
    { duration = defaultDuration, timingFunction = defaultTimingFunction }: Partial<TransitionOptions> = {}
  ) =>
    properties.map((prop) => `${prop} ${duration} ${timingFunction}`).join(', ');

export const transition = createTransition({
  duration: animation.duration.default,
  timingFunction: animation.timingFunction.default,
});
