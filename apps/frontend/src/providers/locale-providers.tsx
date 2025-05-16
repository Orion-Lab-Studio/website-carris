'use client';

/* * */

import { AppLoader } from '@/components/common/AppLoader';
import { LocaleContextProvider } from '@/contexts/Locale.context';
import { Suspense } from 'react';

/* * */

export function LocaleProviders({ children }) {
	return (
		<Suspense fallback={<AppLoader />}>
			<LocaleContextProvider>
				{children}
			</LocaleContextProvider>
		</Suspense>
	);
}
