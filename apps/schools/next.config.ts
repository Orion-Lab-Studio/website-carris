/* * */

import { type NextConfig } from 'next';

/* * */

const nextConfig: NextConfig = {

	basePath: '/schools',

	output: 'standalone',

	reactStrictMode: true,

	async redirects() {
		return [
			{ destination: '/form/:path*', permanent: false, source: '/portal-escolas/:path*' },
		];
	},

};

/* * */

export default nextConfig;
