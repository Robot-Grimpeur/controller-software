import chalk from 'chalk';
import five from 'johnny-five';

import { Logger } from '$lib/logger';
import { clamp, map, Tuple } from '$lib/utils/both';
import { runtimeMode } from '$lib/utils/server';

import { rotationControllerAngleRange } from './types/rotation-controller';

const rotationControllerPin = 10;

export class RotationController {
  private logger: Logger;
  private servo: five.Servo;
  private _angle: number;

  constructor() {
    if (runtimeMode === 'production')
      this.servo = new five.Servo(rotationControllerPin);

    this.logger = new Logger('robot:servo-rotation', chalk.cyan);

    this.angle = 0;
  }

  get angle() {
    return this._angle;
  }

  set angle(newAngle: number) {
    newAngle = clamp(newAngle, ...rotationControllerAngleRange);
    this._angle = newAngle;

    this.logger.info(`${newAngle}°`);

    if (runtimeMode === 'production') {
      const angle = map(
        newAngle,
        ...rotationControllerAngleRange,
        ...(<Tuple<number, 2>>this.servo.range)
      );
      this.servo.to(angle, 7500);
    }
  }
}
