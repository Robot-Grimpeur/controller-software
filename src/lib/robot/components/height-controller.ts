import chalk from 'chalk';
import five from 'johnny-five';
import ms from 'ms';

import { Logger } from '$lib/logger';
import { clamp, map, Tuple, wait } from '$lib/utils/both';
import { runtimeMode } from '$lib/utils/server';

import { heightControllerHeightRange } from './types/height-controller';

const heightControllerPin = 9;

export class HeightController {
  private static movementTime = ms('1s');

  private logger: Logger;
  private servo: five.Servo;
  private _height: number;

  constructor() {
    if (runtimeMode === 'production')
      this.servo = new five.Servo(heightControllerPin);

    this.logger = new Logger('robot:servo-hauteur', chalk.cyan);

    this.height = heightControllerHeightRange[0];
  }

  get height() {
    return this._height;
  }

  set height(newHeight: number) {
    newHeight = clamp(newHeight, ...heightControllerHeightRange);
    this._height = newHeight;

    this.logger.info(`${Math.round(newHeight * 100)}%`);

    if (runtimeMode === 'production') {
      const angle = map(
        newHeight,
        ...heightControllerHeightRange,
        ...(<Tuple<number, 2>>this.servo.range)
      );
      this.servo.to(angle, HeightController.movementTime);
    }
  }

  goTo(height: number) {
    this.height = height;
    return wait(HeightController.movementTime + ms('0.75s'));
  }
}
