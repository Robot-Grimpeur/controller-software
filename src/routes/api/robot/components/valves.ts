import type { RequestHandler } from '@sveltejs/kit';
import * as s from 'superstruct';

import { robot } from '$lib/robot';

import { UpdateValveTargetDTO } from './valve/[valveId]';

export const UpdateValvesTargetDTO = UpdateValveTargetDTO;
export type UpdateValvesTargetDTO = s.Infer<typeof UpdateValvesTargetDTO>;

export const post: RequestHandler = ({ body }) => {
  if (!s.is(body, UpdateValvesTargetDTO)) return { status: 400 };

  robot.components.valves.target = body.target;

  return {};
};
