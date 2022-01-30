import chalk from 'chalk';
import five from 'johnny-five';

import { Logger } from '$lib/logger';
import { runtimeMode, Tuple } from '$lib/utils/server';

import {
  ValveId,
  valvesName,
  ValveTarget,
  valveTargetsName,
} from './types/valves';

const valvesPin: Record<ValveId, number> = {
  sides: 11,
  center: 12,
};

class Valve {
  private logger: Logger;
  private relay: five.Relay;
  private _target: ValveTarget;

  constructor(valveId: ValveId) {
    if (runtimeMode === 'production')
      this.relay = new five.Relay(valvesPin[valveId]);

    this.logger = new Logger(
      `robot:valves:${valvesName[valveId]}`,
      chalk.white
    );

    this.target = 'atmosphere';
  }

  get target() {
    return this._target;
  }

  set target(newTarget: ValveTarget) {
    this._target = newTarget;

    this.logger.info(valveTargetsName[newTarget]);

    if (runtimeMode === 'production') {
      if (newTarget === 'atmosphere') this.relay.close();
      else this.relay.open();
    }
  }
}

export class Valves implements Record<ValveId, Valve> {
  private valves: Tuple<Valve, 2>;

  sides: Valve;
  center: Valve;

  constructor() {
    this.sides = new Valve('sides');
    this.center = new Valve('center');

    this.valves = [this.sides, this.center];
  }

  set target(newTarget: ValveTarget) {
    this.valves.forEach((valve) => (valve.target = newTarget));
  }
}
