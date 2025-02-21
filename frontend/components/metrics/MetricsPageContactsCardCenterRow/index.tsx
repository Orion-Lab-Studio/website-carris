/* * */
import { ContactMetrics2024CardSchema } from '@/components/metrics/MetricsPageContacts/_data/cards';
import { IconGripVertical, IconInfoCircleFilled, IconMoodAngry } from '@tabler/icons-react';

import styles from './styles.module.css';
/* * */

interface Props {
	cardData: ContactMetrics2024CardSchema
}

export function ContactsCardCenterRow({ cardData }: Props) {
	// A. Render Components
	return (
		<div className={styles.miniCardContainer}>
			<div className={styles.miniCardcontentNumber}>
				<span><IconInfoCircleFilled size={30} /></span>
				<p className={styles.miniCardcontentNumberValue}>teste1</p>
			</div>

			<div className={styles.miniCardcontentNumber}>
				<span><IconMoodAngry size={40} /></span>
				<p className={styles.miniCardcontentNumberValue}>teste2</p>
			</div>

			<div className={styles.miniCardcontentNumber}>
				<span><IconGripVertical size={50} /></span>
				<p className={styles.miniCardcontentNumberValue}>teste3</p>
			</div>
		</div>
	);
	//
}
