'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Review2024QuizPoints } from '@/components/review-2024/Review2024QuizPoints';
import { Review2024QuizQuestions } from '@/components/review-2024/Review2024QuizQuestions';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	points: number
	progress: number
	setPoints: (value: number) => void
	setProgress: (value: number) => void
}

/* * */

export function Review2024LevelFive({ points, progress, setPoints, setProgress }: Props) {
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
					<Review2024QuizPoints points={points} />
				</Section>

				<Section withPadding="desktop" withGap>
					<Review2024QuizQuestions
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
