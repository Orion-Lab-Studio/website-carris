/* * */

import { NewsList } from '@/components/news/NewsList';
import { Metadata } from 'next';

/* * */

export default function Page() {
	return <NewsList />;
}

export const metadata: Metadata = {
	description: 'Todas as noticias da carris metropolitana',
	openGraph: {
		description: 'Notícias',
		title: 'CMetropolitana - Notícias',
	},
	title: 'CMetropolitana - Notícias',
};
