import type { RequestHandler } from '@sveltejs/kit';
import * as s from 'superstruct';

import { robot } from '$lib/robot';
import {
  isValveId,
  ValveTarget,
  valveTargets,
} from '$lib/robot/components/types/valves';
import type { TypedRequestHandler } from '$lib/utils/server';

export interface GetValveTargetDTO {
  target: ValveTarget;
}

export const UpdateValveTargetDTO = s.object({
  target: s.define<ValveTarget>('ValveTarget', (v: any) =>
    valveTargets.includes(v)
  ),
});
export type UpdateValveTargetDTO = s.Infer<typeof UpdateValveTargetDTO>;

export const get: TypedRequestHandler<GetValveTargetDTO> = ({
  params: { valveId },
}) => {
  if (!isValveId(valveId)) return { status: 400 };

  return {
    body: {
      target: robot.components.valves[valveId].target,
    },
  };
};

export const post: RequestHandler = ({ params: { valveId }, body }) => {
  if (!isValveId(valveId) || !s.is(body, UpdateValveTargetDTO))
    return { status: 400 };

  robot.components.valves[valveId].target = body.target;

  return {};
};
