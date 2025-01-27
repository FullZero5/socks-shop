import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

import node from '@astrojs/node'
//import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  site: process.env.CI
    ? 'https://socks-shop.vercel.app/'
    : 'http://localhost:4321',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
})