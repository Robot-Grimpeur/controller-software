import type { RequestHandler } from '@sveltejs/kit';
import execa from 'execa';

import { runtimeMode } from '$lib/utils/server';

export const post: RequestHandler = async () => {
  if (runtimeMode === 'production') await execa('reboot', ['-h', '1']);
  return {};
};
