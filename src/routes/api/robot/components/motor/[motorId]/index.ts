import type { RequestHandler } from '@sveltejs/kit';
import * as s from 'superstruct';

import { robot } from '$lib/robot';
import {
  isMotorId,
  MotorMovement,
  motorMovements,
} from '$lib/robot/components/types/motors';
import type { TypedRequestHandler } from '$lib/utils/server';

export interface MotorData {
  movement: MotorMovement;
}

export const UpdateMotorMovementDTO = s.object({
  movement: s.define<MotorMovement>('MotorMovement', (v: any) =>
    motorMovements.includes(v)
  ),
});
export type UpdateMotorMovementDTO = s.Infer<typeof UpdateMotorMovementDTO>;

export const get: TypedRequestHandler<MotorData> = ({
  params: { motorId },
}) => {
  if (!isMotorId(motorId)) return { status: 400 };

  return {
    body: {
      movement: robot.components.motors[motorId].movement,
    },
  };
};

export const post: RequestHandler = ({ params: { motorId }, body }) => {
  if (!isMotorId(motorId) || !s.is(body, UpdateMotorMovementDTO))
    return { status: 400 };

  robot.components.motors[motorId].movement = body.movement;

  return {};
};
