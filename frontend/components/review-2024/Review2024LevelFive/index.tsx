'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Review2024CardGroup } from '@/components/review-2024/Review2024CardGroup';
import { useTranslations } from 'next-intl';

import { Review2024QuizWrapper } from '../Review2024QuizWrapper';
import styles from './styles.module.css';

/* * */

export function Review2024LevelFive() {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2024.Review2024LevelFive');

	//
	// B. Render components

	return (
		<Surface forceOverflow>
			<Grid columns="ab">

				<Section withPadding="desktop" withGap>
					<div className={styles.headingWrapper}>
						<h2 className={styles.heading}>{t('digital.heading')}</h2>
						<h5 className={styles.subheading}>{t('digital.subheading')}</h5>
					</div>
				</Section>

				<Section withPadding="desktop" withGap>
					<Review2024QuizWrapper />
				</Section>

			</Grid>
		</Surface>
	);

	//
}
