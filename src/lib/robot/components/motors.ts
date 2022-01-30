import chalk from 'chalk';
import five from 'johnny-five';

import { Logger } from '$lib/logger';
import type { Tuple } from '$lib/utils/both';
import { runtimeMode } from '$lib/utils/server';

import { Pins } from './helpers/pins';
import {
  limitSwitchesName,
  LimitSwitchId,
  limitSwitchStatesName,
  MotorDirection,
  MotorId,
  MotorMovement,
  motorMovementsName,
  motorsName,
} from './types/motors';

const motorsPins: Record<
  MotorId,
  { pins: Tuple<number, 2>; limitSwitches: Record<LimitSwitchId, number> }
> = {
  left: {
    pins: [2, 3],
    limitSwitches: {
      front: 15,
      back: 17,
    },
  },
  right: {
    pins: [6, 7],
    limitSwitches: {
      front: 14,
      back: 16,
    },
  },
};

class LimitSwitch {
  private logger: Logger;
  private button: five.Button;

  activated = false;

  constructor(motorId: MotorId, limitSwitchId: LimitSwitchId) {
    if (runtimeMode === 'production') {
      this.button = new five.Button({
        pin: motorsPins[motorId].limitSwitches[limitSwitchId],
        isPullup: true,
        invert: false,
      });

      this.button.on('press', () => {
        this.logger.info(limitSwitchStatesName['pressed']);
        this.activated = true;
      });
      this.button.on('release', () => {
        this.logger.info(limitSwitchStatesName['free']);
        this.activated = false;
      });
    }

    this.logger = new Logger(
      `robot:moteurs:interrupteurs:${motorsName[motorId]}-${limitSwitchesName[limitSwitchId]}`,
      chalk.green
    );
  }

  get nextPress(): Promise<void> {
    if (runtimeMode === 'production')
      return new Promise((resolve) => this.button.once('press', resolve));
    return Promise.resolve();
  }
}

class LimitSwitches implements Record<LimitSwitchId, LimitSwitch> {
  front: LimitSwitch;
  back: LimitSwitch;

  constructor(motorId: MotorId) {
    this.front = new LimitSwitch(motorId, 'front');
    this.back = new LimitSwitch(motorId, 'back');
  }
}

class Motor {
  private logger: Logger;
  private pins: Pins<2>;
  private _movement: MotorMovement = 'none';

  limitSwitches: LimitSwitches;

  constructor(motorId: MotorId) {
    if (runtimeMode === 'production')
      this.pins = new Pins(...motorsPins[motorId].pins);

    this.limitSwitches = new LimitSwitches(motorId);

    this.logger = new Logger(
      `robot:moteurs:${motorsName[motorId]}`,
      chalk.yellow
    );
  }

  get movement() {
    return this._movement;
  }

  set movement(newMovement: MotorMovement) {
    this.logger.info(motorMovementsName[newMovement]);

    if (runtimeMode === 'production') {
      if (newMovement === 'none') this.pins.low();
      else
        this.pins.write(
          newMovement === 'forward' ? [true, false] : [false, true]
        );
    }
  }

  getLimitSwitchForDirection(direction: MotorDirection) {
    return this.limitSwitches[direction === 'forward' ? 'front' : 'back'];
  }

  async moveUntilSwitch(direction: MotorDirection): Promise<void> {
    const limitSwitch = this.getLimitSwitchForDirection(direction);

    if (limitSwitch.activated) return;

    this.movement = direction;

    await limitSwitch.nextPress;

    this.movement = 'none';
  }
}

export class Motors implements Record<MotorId, Motor> {
  private motors: Tuple<Motor, 2>;

  left: Motor;
  right: Motor;

  constructor() {
    this.left = new Motor('left');
    this.right = new Motor('right');

    this.motors = [this.left, this.right];
  }

  set movement(newMovement: MotorMovement) {
    this.motors.forEach((motor) => (motor.movement = newMovement));
  }

  getLimitSwitchesForDirection(
    direction: MotorDirection
  ): Tuple<LimitSwitch, 2> {
    return this.motors.map((motor) =>
      motor.getLimitSwitchForDirection(direction)
    ) as Tuple<LimitSwitch, 2>;
  }

  async moveUntilSwitch(direction: MotorDirection): Promise<void> {
    const limitSwitches = this.getLimitSwitchesForDirection(direction);

    if (limitSwitches.some((limitSwitch) => limitSwitch.activated)) return;

    this.movement = direction;

    await Promise.any(
      limitSwitches.map((limitSwitch) => limitSwitch.nextPress)
    );

    this.movement = 'none';
  }
}
