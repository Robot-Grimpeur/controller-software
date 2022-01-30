export const robotDirections = ['forward', 'backward'] as const;
export type RobotDirection = typeof robotDirections[number];
export const robotDirectionsName: Record<RobotDirection, string> = {
  forward: "vers l'avant",
  backward: "vers l'arrière",
};
