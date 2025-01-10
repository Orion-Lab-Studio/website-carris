'use client';

/* * */

import { LottiePlayer } from '@/components/common/LottiePlayer';
import { allQuizData } from '@/components/review-2024/_data/quiz';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	points: number
}

/* * */

export function Review2024QuizFinalResult({ points }: Props) {
	//

	//
	// A. Transform data

	const t = useTranslations('review-2024.Review2024QuizFinalResult');

	//
	// C. Render components

	return (
		<div className={styles.container}>

			<div className={styles.animation}>
				<LottiePlayer path="/assets/review-2024/animations/digital/website_daily.json" loop play />
			</div>

			<p className={styles.title}>Parabéns!</p>

			<p className={styles.subtitle}>{t('points', { points: points, total: allQuizData.length })}</p>

		</div>
	);

	//
}
