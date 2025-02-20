/* * */

import { allCardsData } from '@/components/metrics/MetricsPageContacts/_data/cards';
import { MetricsPageContactsCard } from '@/components/metrics/MetricsPageContactsCard';

import styles from './styles.module.css';

/* * */

interface Props {
	groupId: string
}

/* * */

export function MetricsContactsPage2024CardGroup({ groupId }: Props) {
	//

	//
	// A. Transform data

	const groupCards = allCardsData.filter(card => card._group === groupId);

	// B. Render components

	return (
		<div className={styles.container}>
			{groupCards[0]._group_title && <h3 className={styles.groupTitle}>{groupCards[0]._group_title}</h3>}
			{groupCards.map((cardData, index) => (
				<MetricsPageContactsCard
					key={cardData._id}
					cardData={cardData}
					isFirstChild={index === 0}
					isLastChild={index === groupCards.length - 1}
				/>
			))}
		</div>
	);

	//
}
