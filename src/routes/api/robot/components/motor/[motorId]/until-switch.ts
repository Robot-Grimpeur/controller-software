import type { RequestHandler } from '@sveltejs/kit';
import * as s from 'superstruct';

import { robot } from '$lib/robot';
import {
  isMotorId,
  MotorDirection,
  motorDirections,
} from '$lib/robot/components/types/motors';

export const UpdateMotorDirectionUntilSwitchDTO = s.object({
  direction: s.define<MotorDirection>('MotorDirection', (v: any) =>
    motorDirections.includes(v)
  ),
});
export type UpdateMotorDirectionUntilSwitchDTO = s.Infer<
  typeof UpdateMotorDirectionUntilSwitchDTO
>;

export const post: RequestHandler = ({ params: { motorId }, body }) => {
  if (!isMotorId(motorId) || !s.is(body, UpdateMotorDirectionUntilSwitchDTO))
    return { status: 400 };

  robot.components.motors[motorId].moveUntilSwitch(body.direction);

  return {};
};
