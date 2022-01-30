import chalk from 'chalk';
import five from 'johnny-five';

import { Logger } from '$lib/logger';
import { runtimeMode } from '$lib/utils/server';

import { LedState, ledStatesName } from './types/led';

const ledPin = 13;

export class Led {
  private logger: Logger;
  private led: five.Led;
  private _state: LedState = 'off';

  constructor() {
    if (runtimeMode === 'production') this.led = new five.Led(ledPin);

    this.logger = new Logger('robot:del', chalk.white);
  }

  get state() {
    return this._state;
  }

  set state(newValue: LedState) {
    this._state = newValue;

    this.logger.info(ledStatesName[newValue]);

    if (runtimeMode === 'production') {
      if (newValue === 'on') this.led.on();
      else this.led.off();
    }
  }
}
