import type { RequestHandler } from '@sveltejs/kit';
import * as s from 'superstruct';

import { robot } from '$lib/robot';
import {
  RobotDirection,
  robotDirections,
} from '$lib/robot/components/types/robot';

export const WalkDTO = s.object({
  numberOfSteps: s.define<number>(
    'NumberOfSteps',
    (v: any) => typeof v === 'number' && v >= 1
  ),
  direction: s.define<RobotDirection>('RobotDirection', (v: any) =>
    robotDirections.includes(v)
  ),
});
export type WalkDTO = s.Infer<typeof WalkDTO>;

export const post: RequestHandler = ({ body }) => {
  if (!s.is(body, WalkDTO)) return { status: 400 };

  robot.walk(body.numberOfSteps, body.direction);

  return {};
};
