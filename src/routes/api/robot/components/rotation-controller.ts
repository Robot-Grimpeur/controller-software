import type { RequestHandler } from '@sveltejs/kit';
import * as s from 'superstruct';

import { robot } from '$lib/robot';
import { rotationControllerAngleRange } from '$lib/robot/components/types/rotation-controller';
import type { TypedRequestHandler } from '$lib/utils/server';

export interface GetRotationControllerRotationDTO {
  angle: number;
}

export const UpdateRotationControllerAngleDTO = s.object({
  angle: s.define<number>(
    'Rotation',
    (v: any) =>
      typeof v === 'number' &&
      v >= rotationControllerAngleRange[0] &&
      v <= rotationControllerAngleRange[1]
  ),
});
export type UpdateRotationControllerAngleDTO = s.Infer<
  typeof UpdateRotationControllerAngleDTO
>;

export const get: TypedRequestHandler<
  GetRotationControllerRotationDTO
> = () => {
  return {
    body: {
      angle: robot.components.rotationController.angle,
    },
  };
};

export const post: RequestHandler = ({ body }) => {
  if (!s.is(body, UpdateRotationControllerAngleDTO)) return { status: 400 };

  robot.components.rotationController.angle = body.angle;

  return {};
};
