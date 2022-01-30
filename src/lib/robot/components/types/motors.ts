export const limitSwitchStates = ['pressed', 'free'] as const;
export type LimitSwitchState = typeof limitSwitchStates[number];
export const limitSwitchStatesName: Record<LimitSwitchState, string> = {
  pressed: 'appuyé',
  free: 'libre',
};

export const limitSwitchIds = ['front', 'back'] as const;
export type LimitSwitchId = typeof limitSwitchIds[number];
export const isLimitSwitchId = (v: any): v is LimitSwitchId =>
  limitSwitchIds.includes(v);
export const limitSwitchesName: Record<LimitSwitchId, string> = {
  front: 'avant',
  back: 'arrière',
};

export const motorDirections = ['forward', 'backward'] as const;
export type MotorDirection = typeof motorDirections[number];

export const motorMovements = [...motorDirections, 'none'] as const;
export type MotorMovement = typeof motorMovements[number];
export const motorMovementsName: Record<MotorMovement, string> = {
  forward: "vers l'avant",
  backward: "vers l'arrière",
  none: 'arrêté',
};

export const motorIds = ['left', 'right'] as const;
export type MotorId = typeof motorIds[number];
export const isMotorId = (v: any): v is MotorId => motorIds.includes(v);
export const motorsName: Record<MotorId, string> = {
  left: 'gauche',
  right: 'droit',
};
