/* * */

import { StopsList } from '@/components/stops/StopsList';
import { Metadata } from 'next';

/* * */

export default function Page() {
	return (
		<StopsList />
	);
}

export const metadata: Metadata = {
	description: 'Todas as paragens da carris metropolitana',
	openGraph: {
		description: 'Paragens',
		title: 'CMetropolitana - Paragens',
	},
	title: 'CMetropolitana - Paragens',
};
