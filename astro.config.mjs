// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://corecodev618.github.io',
  // La dirección anterior del portafolio sigue llevando a la nueva.
  redirects: { '/personal-portafolio': '/' },
  integrations: [sitemap()],
});
