import type { RequestHandler } from '@sveltejs/kit/types/endpoint';
import type { JSONValue } from '@sveltejs/kit/types/helper';

export const runtimeMode = (process.env.APP_ENV ?? 'production') as
  | 'development'
  | 'build'
  | 'production';

export type TypedRequestHandler<T> = RequestHandler<
  Record<string, any>,
  unknown,
  T & { [key: string]: JSONValue }
>;
