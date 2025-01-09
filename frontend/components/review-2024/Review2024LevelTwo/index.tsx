'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Review2024CardGroup } from '@/components/review-2024/Review2024CardGroup';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function Review2024LevelTwo() {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2024.Review2024LevelTwo');

	//
	// B. Render components

	return (
		<Surface forceOverflow>
			<Grid columns="abc">

				<Section withPadding="desktop" withGap>
					<div className={styles.headingWrapper}>
						<h2 className={styles.heading}>{t('municipio_growth.heading')}</h2>
						<h5 className={styles.subheading}>{t('municipio_growth.subheading')}</h5>
					</div>
					<Review2024CardGroup groupId="municipio_growth" />
				</Section>

				<Section withPadding="desktop" withGap>
					<div className={styles.headingWrapper}>
						<h2 className={styles.heading}>{t('municipio_pax.heading')}</h2>
						<h5 className={styles.subheading}>{t('municipio_pax.subheading')}</h5>
					</div>
					<Review2024CardGroup groupId="municipio_pax" />
				</Section>

				<Section withPadding="desktop" withGap>
					<div className={styles.headingWrapper}>
						<h2 className={styles.heading}>{t('municipio_terminals.heading')}</h2>
						<h5 className={styles.subheading}>{t('municipio_terminals.subheading')}</h5>
					</div>
					<Review2024CardGroup groupId="municipio_terminals" />
				</Section>

			</Grid>
		</Surface>
	);

	//
}
