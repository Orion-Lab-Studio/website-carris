'use client';

/* * */

import { BackButton } from '@/components/common/BackButton';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { NewsCard } from '@/components/news/NewsCard';
import { NewsCardSkeleton } from '@/components/news/NewsCardSkeleton';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

/* * */

export function NewsList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('news.NewsList');

	//
	// B. Fetch Data

	const { data: allNewsData } = useSWR('/api/news');

	//
	// D. Render Components

	return (
		<Surface>

			<Section withBottomDivider withPadding>
				<BackButton href="/" />
			</Section>

			<Section heading={t('heading')} withPadding>
				<Grid columns="abcd" withGap>
					{allNewsData
						? allNewsData?.map(newsItem => (
							<NewsCard
								key={newsItem._id}
								_id={newsItem._id}
								coverImageSrc={newsItem.cover_image_src}
								publishDate={newsItem.publish_date}
								title={newsItem.title}
							/>
						))
						: Array(16).fill(null).map((_, index) =>
							<NewsCardSkeleton key={index} />,
						)}
				</Grid>
			</Section>

		</Surface>
	);

	//
}
