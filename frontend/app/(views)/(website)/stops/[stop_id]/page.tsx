/* * */

import { StopsDetail } from '@/components/stops/StopsDetail';
import { StopsDetailContextProvider } from '@/contexts/StopsDetail.context';

/* * */

// export async function generateMetadata({ params }) {
// 	const data = await params;
// 	try {
// 		const id = await data.news_id;
// 		console.log('meh', id);

// 		const newsData = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/news/${id}`).then(res => res.json());

// 		return {
// 			description: newsData.title,
// 			openGraph: {
// 				description: newsData.title,
// 				title: newsData.title,
// 			},
// 			title: newsData.title,
// 		};
// 	}
// 	catch (error) {
// 		console.error('There was an error loading the page metadata: ', error);
// 		return {
// 			description: 'TESTE',
// 			openGraph: {
// 				description: 'TESTE',
// 				title: 'CMetropolitana - TESTE',
// 			},
// 			title: 'TESTE',
// 		};
// 	}
// }

export default async function Page({ params }) {
	//

	//
	// A. Setup variables

	const { stop_id } = await params;

	//
	// B. Render components

	return (
		<StopsDetailContextProvider stopId={stop_id}>
			<StopsDetail />
		</StopsDetailContextProvider>
	);

	//
}
