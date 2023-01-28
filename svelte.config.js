import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		paths: {
			base: process.env.NODE_ENV === "production" ? "/bookmarkmerge" : "",
			// assets: '/memento-sveltekit-and-github-pages',
			// base: '/bookmarkmerge'
		},
		prerender: {
			crawl: true,
			enabled: true,
			// onError: 'continue',
			// default: true
		},
	}
};

export default config;
