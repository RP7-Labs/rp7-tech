// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://rp7.tech',
	output: 'static',
	adapter: cloudflare({ imageService: 'passthrough' }),
	session: false,
	integrations: [react(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
