'use client';

/* * */

import { RootProviders } from '@/providers/root-providers';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';

/* * */

export default function Layout({ children }) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<NuqsAdapter>
				<RootProviders>
					{children}
				</RootProviders>
			</NuqsAdapter>
		</Suspense>
	);
}
