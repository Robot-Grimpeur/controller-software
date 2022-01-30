import adapter from '@sveltejs/adapter-node';
import fs from 'fs';
import preprocess from 'svelte-preprocess';

const pkg = JSON.parse(
  fs.readFileSync(new URL('package.json', import.meta.url), 'utf8')
);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    target: '#svelte',
    ssr: true,
    vite: {
      define: {
        __PACKAGE_JSON__: JSON.stringify(pkg),
      },
    },
  },
};

export default config;
