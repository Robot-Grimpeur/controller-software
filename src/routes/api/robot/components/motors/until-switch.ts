import type { RequestHandler } from '@sveltejs/kit';
import * as s from 'superstruct';

import { robot } from '$lib/robot';

import { UpdateMotorDirectionUntilSwitchDTO } from '../motor/[motorId]/until-switch';

export const UpdateMotorsDirectionUntilSwitchDTO =
  UpdateMotorDirectionUntilSwitchDTO;
export type UpdateMotorsDirectionUntilSwitchDTO = s.Infer<
  typeof UpdateMotorsDirectionUntilSwitchDTO
>;

export const post: RequestHandler = ({ body }) => {
  if (!s.is(body, UpdateMotorsDirectionUntilSwitchDTO)) return { status: 400 };

  robot.components.motors.moveUntilSwitch(body.direction);

  return {};
};
