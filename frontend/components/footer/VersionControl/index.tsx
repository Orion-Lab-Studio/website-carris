'use client';

/* * */

import Link from 'next/link';
import { URLS } from '@/settings/urls.settings';
import pjson from 'package.json';

/* * */

export function VersionControl({ className }) {
	return (
		<Link className={className} href={URLS.repos.website} target="_blank">
			{pjson.version}
		</Link>
	);
}
