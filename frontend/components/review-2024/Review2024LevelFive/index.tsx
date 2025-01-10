'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Review2024CardGroup } from '@/components/review-2024/Review2024CardGroup';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Review2024QuizPoints } from '../Review2024QuizPoints';
import { Review2024QuizWrapper } from '../Review2024QuizWrapper';
import styles from './styles.module.css';

/* * */

export function Review2024LevelFive() {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2024.Review2024LevelFive');

	const [points, setPoints] = useState(1);
	const [progress, setProgress] = useState(0);

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
					<Review2024QuizPoints points={points} />
				</Section>

				<Section withPadding="desktop" withGap>
					<Review2024QuizWrapper
						points={points}
						progress={progress}
						setPoints={setPoints}
						setProgress={setProgress}
					/>
				</Section>

			</Grid>
		</Surface>
	);

	//
}
