import type { RequestHandler } from '@sveltejs/kit';
import * as s from 'superstruct';

import { robot } from '$lib/robot';

import { UpdateMotorMovementDTO } from '../motor/[motorId]';

export const UpdateMotorsMovementDTO = UpdateMotorMovementDTO;
export type UpdateMotorsMovementDTO = s.Infer<typeof UpdateMotorsMovementDTO>;

export const post: RequestHandler = ({ body }) => {
  if (!s.is(body, UpdateMotorsMovementDTO)) return { status: 400 };

  robot.components.motors.movement = body.movement;

  return {};
};
