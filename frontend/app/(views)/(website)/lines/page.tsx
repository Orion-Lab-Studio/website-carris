/* * */

import { LinesList } from '@/components/lines/LinesList';
import { Metadata } from 'next';

/* * */

export default function Page() {
	return (
		<LinesList />
	);
}

export const metadata: Metadata = {
	description: 'Todas as linhas da carris metropolitana',
	openGraph: {
		description: 'Linhas',
		title: 'CMetropolitana - Linhas',
	},
	title: 'CMetropolitana - Linhas',
};
