/* * */

import { withPayload } from '@payloadcms/next/withPayload';
import { type NextConfig } from 'next';

/* * */

const nextConfig: NextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	redirects: async () => {
		return [
			{ destination: '/admin', permanent: true, source: '/' },
		];
	},
};

/* * */

export default withPayload(nextConfig);
