'use client';

/* * */

import { AnalyticsContextProvider } from '@/contexts/Analytics.context';
import { ConsentContextProvider } from '@/contexts/Consent.context';

import { LocaleProviders } from './locale-providers';

/* * */

export function RootProviders({ children }) {
	return (
		<LocaleProviders>
			<ConsentContextProvider>
				<AnalyticsContextProvider>
					{children}
				</AnalyticsContextProvider>
			</ConsentContextProvider>
		</LocaleProviders>
	);
}
