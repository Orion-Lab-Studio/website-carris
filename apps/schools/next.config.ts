/* * */

import { type NextConfig } from 'next';

/* * */

const nextConfig: NextConfig = {

	basePath: '/schools',

	output: 'standalone',

	reactStrictMode: true,

	async redirects() {
		return [
			// { destination: '/schools', permanent: true, source: '/' },
			// { destination: '/schools', permanent: true, source: '/escolas' },
		];
	},

};

/* * */

export default nextConfig;
