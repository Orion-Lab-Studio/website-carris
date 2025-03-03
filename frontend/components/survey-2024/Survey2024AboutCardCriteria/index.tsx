/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';
/* * */

export function Survey2024AboutCardCriteria() {
	//

	//
	// A. Setup Variables
	const t = useTranslations('survey-2024');
	//
	// B. Render Components
	return (
		<div>
			<div className={styles.cardMainWrapperShadow}>
				<p className={styles.headerTitle}>Com que critérios?</p>
			</div>
			<div className={styles.cardMainWrapper}>
				<div className={styles.cardContent}>
					<div className={styles.firstRow}>
						<p>4</p>
						<p>classes de procura de linhas
							(de alta a baixa procura)
						</p>
					</div>
					<div className={styles.secondRow}>
						<p>2</p>
						<p>tipos de dia
							(úteis e não úteis)
						</p>
					</div>
					<div className={styles.thirdRow}>
						<p>6</p>
						<p>períodos
							horários
						</p>
					</div>
					<p className={styles.fourthRow}>
						A distribuição equilibrada
						das entrevistas asseguraram a representatividade da amostra.
					</p>
				</div>
			</div>
		</div>

	// <div className={styles.containerStatistics}>
	// 	<div className={styles.header}>
	// 		<p className={styles.headerNumberStatistics}>95,5%</p>
	// 	</div>

	// 	<p className={styles.headerTitle}>{t('Survey2024AboutCard.confidence_interval')}</p>

	// 	<div className={styles.header}>
	// 		<p className={styles.headerNumberStatistics}>1,8%</p>
	// 		<p className={styles.headerTitle}>{t('Survey2024AboutCard.error_margin')}</p>
	// 	</div>
	// </div>
	);
	//
}
