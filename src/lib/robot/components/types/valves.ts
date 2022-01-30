export const valveTargets = ['atmosphere', 'pump'] as const;
export type ValveTarget = typeof valveTargets[number];
export const valveTargetsName: Record<ValveTarget, string> = {
  atmosphere: 'atmosphère',
  pump: 'pompe',
};

export const valveIds = ['sides', 'center'] as const;
export type ValveId = typeof valveIds[number];
export const isValveId = (v: any): v is ValveId => valveIds.includes(v);
export const valvesName: Record<ValveId, string> = {
  sides: 'côtés',
  center: 'centre',
};
