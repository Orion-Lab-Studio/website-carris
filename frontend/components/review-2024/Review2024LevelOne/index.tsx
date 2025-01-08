'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Image } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { allCardsData } from '../_data/cards';
import { Review2024Card } from '../Review2024Card';
import { Review2024CardGroup } from '../Review2024CardGroup';
import styles from './styles.module.css';

/* * */

export function Review2024LevelOne() {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2024.Review2024LevelOne');

	//
	// B. Render components

	return (
		<Surface forceOverflow>
			<Grid columns="abc">
				<Section withGap withPadding>
					<h2 className={styles.heading}>{t('a.heading')}</h2>
					<h5 className={styles.subheading}>{t('a.subheading')}</h5>
					<Review2024CardGroup>
						<Review2024Card cardData={allCardsData[0]} />
						<Review2024Card cardData={allCardsData[1]} />
						<Review2024Card cardData={allCardsData[2]} />
					</Review2024CardGroup>
				</Section>
				<Section withGap withPadding>
					<h2 className={styles.heading}>{t('b.heading')}</h2>
					<h5 className={styles.subheading}>{t('b.subheading')}</h5>
					<Image alt="Review 2024" className={styles.image} src="/images/review-2024/intro.png" />
				</Section>
				<Section withGap withPadding>
					<h2 className={styles.heading}>{t('c.heading')}</h2>
					<h5 className={styles.subheading}>{t('c.subheading')}</h5>
					<Image alt="Review 2024" className={styles.image} src="/images/review-2024/intro.png" />
				</Section>
			</Grid>
		</Surface>
	);

	//
}
