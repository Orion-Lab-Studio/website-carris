'use client';

/* * */

import { allQuizData, type Review2024QuizAnswerSchema } from '@/components/review-2024/_data/quiz';
import { Review2024QuizFinalResult } from '@/components/review-2024/Review2024QuizFinalResult';
import { Review2024QuizQuestion } from '@/components/review-2024/Review2024QuizQuestion';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	points: number
	progress: number
	setPoints: (value: number) => void
	setProgress: (value: number) => void
}

/* * */

export function Review2024QuizQuestions({ points, progress, setPoints, setProgress }: Props) {
	//

	//
	// A. Setup variables

	const [answerStatus, setAnswerStatus] = useState<'correct' | 'wrong' | null>(null);

	//
	// B. Handle actions

	const handleClickAnswerOption = (answerData: Review2024QuizAnswerSchema) => {
		if (answerStatus === null) {
			if (answerData.is_correct) {
				setAnswerStatus('correct');
				setPoints(points + 542);
			}
			else {
				setAnswerStatus('wrong');
			}
		}
	};

	const handleAdvanceQuestion = () => {
		setAnswerStatus(null);
		setProgress(progress + 1);
	};

	//
	// C. Render components

	if (progress >= allQuizData.length) {
		return (
			<div className={styles.container}>
				<Review2024QuizFinalResult points={points} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Review2024QuizQuestion
				answerStatus={answerStatus}
				onAnswer={handleClickAnswerOption}
				onClickNext={handleAdvanceQuestion}
				quizData={allQuizData[progress]}
			/>
		</div>
	);

	//
}
