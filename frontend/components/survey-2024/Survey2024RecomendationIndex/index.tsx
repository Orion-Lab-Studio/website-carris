'use client';

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

/* * */

export function Survey2024RecomendationIndex() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey-2024.Survey2024RecomendationIndex');

	// B. Render components

	return (
		<div id="recomendationIndex">
			<Surface forceOverflow>
				<Section withPadding>
					<div className={styles.wrapper}>
						<p>{t('title')}</p>
					</div>
					<div className={styles.container}>
						<div className={styles.numberContainer}>
							<p>7.5</p>
						</div>
						<p className={styles.title}>{t('recomendationIdexDescription')}</p>
					</div>
				</Section>
			</Surface>
		</div>
	);

	//
}
