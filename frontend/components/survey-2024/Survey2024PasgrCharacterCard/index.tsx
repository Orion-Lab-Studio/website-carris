'use client';

/* * */

import { LottiePlayer } from '@/components/common/LottiePlayer';
import { Survey2024PassengersCardSchema } from '@/components/survey-2024/_data/Passenger/cards';

import styles from './styles.module.css';

/* * */

interface Props {
	cardData: Survey2024PassengersCardSchema
}
/* * */

export function Survey2024PasgrCharacterCard({ cardData }: Props) {
	//

	//
	// A. Render components

	return (

		<div className={styles.container} id={cardData._id}>
			{cardData.content.lottie_src && (
				<>

					<div className={styles.contentLottie}>
						<p className={styles.headerTitle}>{cardData.header.title}</p>
						<LottiePlayer
							path={cardData.content.lottie_src}
							loop
							play
						/>
					</div>
				</>
			)}
		</div>

	);

	//
}
