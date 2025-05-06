/* * */

import { type NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload'

/* * */

const nextConfig = {
	output: 'standalone',
	reactStrictMode: true,
}

/* * */

export default withPayload(nextConfig, { devBundleServerPackages: false })
