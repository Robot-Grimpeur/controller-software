import type { RequestHandler } from '@sveltejs/kit';
import * as s from 'superstruct';

import { robot } from '$lib/robot';
import { LedState, ledStates } from '$lib/robot/components/types/led';
import type { TypedRequestHandler } from '$lib/utils/server';

export interface GetLedStateDTO {
  state: LedState;
}

export const UpdateLedStateDTO = s.object({
  state: s.define<LedState>('LedState', (v: any) => ledStates.includes(v)),
});
export type UpdateLedStateDTO = s.Infer<typeof UpdateLedStateDTO>;

export const get: TypedRequestHandler<GetLedStateDTO> = () => {
  return {
    body: {
      state: robot.components.led.state,
    },
  };
};

export const post: RequestHandler = ({ body }) => {
  if (!s.is(body, UpdateLedStateDTO)) return { status: 400 };

  robot.components.led.state = body.state;

  return {};
};
