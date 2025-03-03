/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';
/* * */

export function Survey2024AboutCardPrecision() {
	//

	//
	// A. Setup Variables
	const t = useTranslations('survey-2024');
	//
	// B. Render Components
	return (
		<div>
			<div className={styles.cardMainWrapperShadow}>
				<p className={styles.headerTitle}>Qual foi a precisão?</p>
			</div>
			<div className={styles.cardMainWrapper}>
				<div className={styles.cardContent}>
					<div className={styles.firstRow}>
						<p>99,5%</p>
						<p>intervalo de confiança</p>
					</div>
					<div className={styles.secondRow}>
						<p>1,8%</p>
						<p>margem de erro</p>
					</div>
					<div className={styles.thirdRow}>
						<p>192</p>
						<p>classes amostrais</p>
					</div>
					<p className={styles.fourthRow}>
						Estes valores refletem a precisão e fiabilidade dos resultados obtidos, uma vez que garantem que, se o inquérito fosse repetido múltiplas vezes nas mesmas condições, os resultados poderiam variar uma média de 1,8% em 99,5% das ocasiões.
					</p>
				</div>
			</div>
		</div>
	);
	//
}
