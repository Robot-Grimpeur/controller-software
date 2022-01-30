import type { Handle } from '@sveltejs/kit';
import chalk from 'chalk';

import { Logger } from '$lib/logger';
import { robot } from '$lib/robot';

const logger = new Logger('requêtes', chalk.magenta);

export const handle: Handle = async ({ request, resolve }) => {
  await robot.ready;

  const { path, method, body, query } = request;
  logger.info(
    `${method} ${path}${
      query.toString().length > 0 ? '?' : ''
    }${query.toString()}`,
    body
  );

  const response = await resolve(request);
  return response;
};
