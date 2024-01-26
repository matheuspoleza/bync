const createIntentInputState = (text: string, error: boolean) => ({
  value: [{ children: [{ text }] }],
  error,
});

export const defaultIntentInputStates = Array.from({ length: 20 }, () => createIntentInputState('Howdy', false)).concat(
  Array.from({ length: 20 }, () => createIntentInputState('Folks', false)),
  Array.from({ length: 10 }, () => createIntentInputState('sdfsdf', false)),
  Array.from({ length: 10 }, () => createIntentInputState('Welcome', false)),
  Array.from({ length: 10 }, () => createIntentInputState('Hardy', false))
);
