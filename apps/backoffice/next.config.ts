/* * */

import { getPublicVariable } from '@carrismetropolitana/website-settings';
import { withPayload } from '@payloadcms/next/withPayload';
import { type NextConfig } from 'next';

/* * */

const nextConfig: NextConfig = {
	basePath: getPublicVariable('backoffice_basepath'),
	output: 'standalone',
	reactStrictMode: true,
};

/* * */

export default withPayload(nextConfig);
