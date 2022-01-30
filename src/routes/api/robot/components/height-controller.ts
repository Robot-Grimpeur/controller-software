import type { RequestHandler } from '@sveltejs/kit';
import * as s from 'superstruct';

import { robot } from '$lib/robot';
import { heightControllerHeightRange } from '$lib/robot/components/types/height-controller';
import type { TypedRequestHandler } from '$lib/utils/server';

export interface GetHeightControllerHeightDTO {
  height: number;
}

export const UpdateHeightControllerHeightDTO = s.object({
  height: s.define<number>(
    'Height',
    (v: any) =>
      typeof v === 'number' &&
      v >= heightControllerHeightRange[0] &&
      v <= heightControllerHeightRange[1]
  ),
});
export type UpdateHeightControllerHeightDTO = s.Infer<
  typeof UpdateHeightControllerHeightDTO
>;

export const get: TypedRequestHandler<GetHeightControllerHeightDTO> = () => {
  return {
    body: {
      height: robot.components.heightController.height,
    },
  };
};

export const post: RequestHandler = ({ body }) => {
  if (!s.is(body, UpdateHeightControllerHeightDTO)) return { status: 400 };

  robot.components.heightController.height = body.height;

  return {};
};
