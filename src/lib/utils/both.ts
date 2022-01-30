export const InfinitePromise = new Promise<any>(() => null);

type EmitterListenner = () => void;
export class Emitter {
  private listenners: EmitterListenner[] = [];

  emit() {
    this.listenners.forEach((listenner) => listenner());
  }

  subscribe(listenner: EmitterListenner) {
    this.listenners.push(listenner);
  }
}

export const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);
export const map = (
  n: number,
  min1: number,
  max1: number,
  min2: number,
  max2: number
) => ((n - min1) / (max1 - min1)) * (max2 - min2) + min2;

// https://stackoverflow.com/a/52490977
export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

export const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
