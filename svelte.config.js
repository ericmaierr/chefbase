import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  // 1) Runes-Mode aktivieren
  compilerOptions: {
    runes: true
  },
  // 2) Preprocessor einschalten
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      edge: false,
      split: false
    })
  }
};

export default config;