/* * */

import SinglePage from 'components/news/SinglePage';

/* * */

export default async function Page({ params }) {
	const { news_id } = await params;
	return <SinglePage newsId={news_id} />;
}
