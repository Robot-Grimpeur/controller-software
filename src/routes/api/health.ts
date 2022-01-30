import execa from 'execa';

import { runtimeMode, TypedRequestHandler } from '$lib/utils/server';

export interface HealthData {
  throttled: string[];
  mode: typeof runtimeMode;
}

export const get: TypedRequestHandler<HealthData> = async () => {
  const throttled = runtimeMode === 'development' ? [] : await getThrottled();

  return {
    body: { throttled, mode: runtimeMode },
  };
};

async function getThrottled(): Promise<string[]> {
  const messages = [
    [0, 'Under-voltage!'],
    [1, 'ARM frequency capped!'],
    [2, 'Currently throttled!'],
    [3, 'Soft temperature limit active'],
    [16, 'Under-voltage has occurred since last reboot.'],
    [17, 'Throttling has occurred since last reboot.'],
    [18, 'ARM frequency capped has occurred since last reboot.'],
    [19, 'Soft temperature limit has occurred'],
  ] as const;

  const { stdout } = await execa('vcgencmd', ['get_throttled']);
  const code = parseInt(stdout.split('=')[1]).toString(2);

  return messages
    .filter(([bit]) => code[code.length - bit - 1] === '1')
    .map(([, message]) => message);
}
