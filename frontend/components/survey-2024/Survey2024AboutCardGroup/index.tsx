/* * */

import { allAboutCardsData } from '@/components/survey-2024/_data/About/cards';
import { Survey2024AboutCard } from '@/components/survey-2024/Survey2024AboutCard';

import styles from './styles.module.css';

/* * */

export function Survey2024AboutCardGroup() {
	//

	//
	// A. Render components

	return (
		<div className={styles.container}>
			{allAboutCardsData.map((cardData, index) => (
				<Survey2024AboutCard
					key={cardData._id}
					cardData={cardData}
					isFirstChild={index === 0}
					isLastChild={index === allAboutCardsData.length - 1}
				/>
			))}
		</div>
	);

	//
}
