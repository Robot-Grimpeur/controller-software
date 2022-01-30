import five from 'johnny-five';

import type { Tuple } from '$lib/utils/server';

export class Pins<N extends number> {
  private pins: Tuple<five.Pin, N>;

  constructor(...pinNumbers: Tuple<number | string, N>) {
    this.pins = pinNumbers.map(
      (pinNumber) => new five.Pin(pinNumber)
    ) as typeof this.pins;
  }

  write(values: Tuple<boolean, N>): void {
    this.pins.forEach((pin, i) => pin.write(+values[i]));
  }

  high(): void {
    this.pins.forEach((pin) => pin.high());
  }

  low(): void {
    this.pins.forEach((pin) => pin.low());
  }
}
