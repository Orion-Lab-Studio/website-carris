'use client';

/* * */

import { BackButton } from '@/components/common/BackButton';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { NewsCard } from '@/components/news/NewsCard';
import { NewsCardSkeleton } from '@/components/news/NewsCardSkeleton';
import { NewsListToolbar } from '@/components/news/NewsListToolbar';
import { useNewsListContext } from '@/contexts/NewsList.context';
import { useTranslations } from 'next-intl';

/* * */

export function NewsList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('news.NewsList');
	const newsListContext = useNewsListContext();

	//
	// B. Render Components

	return (
		<Surface>
			<Section withBottomDivider withPadding>
				<BackButton href="/" />
			</Section>
			<NewsListToolbar />
			{(!newsListContext.flags.is_loading && newsListContext.data.filtered) && (
				<Section heading={t('heading')} withPadding>
					<Grid columns="abcd" withGap>
						{newsListContext.data.filtered
							? newsListContext.data.filtered?.map(newsItem => (
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
			)}
		</Surface>
	);

	//
}
