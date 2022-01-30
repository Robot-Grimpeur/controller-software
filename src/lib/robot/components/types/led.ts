export const ledStates = ['on', 'off'] as const;
export type LedState = typeof ledStates[number];
export const ledStatesName: Record<LedState, string> = {
  on: 'allumée',
  off: 'éteinte',
};
