/* * */
import { LottiePlayer } from '@/components/common/LottiePlayer';
import { ContactMetrics2024CardSchema } from '@/components/metrics/MetricsPageContacts/_data/cards';

import styles from './styles.module.css';
/* * */

interface Props {
	cardData: ContactMetrics2024CardSchema
}

export function ContactsCardBottomRow({ cardData }: Props) {
	// A. Render Components
	return (
		<div className={styles.contentNumber}>
			<div className={styles.leftSectionBottom}>
				<p className={styles.contentNumberValue}>{cardData.content.number_value}</p>
				<p className={styles.contentNumberLegend}>{cardData.content.number_legend}</p>
			</div>
			<div className={styles.rightSectionBottom}>
				<LottiePlayer className={styles.lottie} path="/assets/tickets/animations/proxima.json" loop play />
			</div>
		</div>
	);
	//
}
