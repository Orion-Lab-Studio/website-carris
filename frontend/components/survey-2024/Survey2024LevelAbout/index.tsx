'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { allAboutCardsData } from '@/components/survey-2024/_data/About/cards';
import { Survey2024AboutCard } from '@/components/survey-2024/Survey2024AboutCard';
import { Survey2024AboutCardCriteria } from '@/components/survey-2024/Survey2024AboutCardCriteria';
import { Survey2024AboutCardPrecision } from '@/components/survey-2024/Survey2024AboutCardPrecision';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function Survey2024LevelAbout() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey-2024');
	const allAboutCardData = allAboutCardsData;

	//
	// B. Render components

	return (
		<div id="aboutSurvey">
			<Surface>
				<Section withGap withPadding>
					<h2 className={styles.sectionTitle}>{t('Survey2024Header.AnchorAboutSurveyTitle')}</h2>
					<div className={styles.cardSection}>
						{allAboutCardData.map((cardData, index) => (
							<Survey2024AboutCard key={index} cardData={cardData} />
						))}
						<Survey2024AboutCardCriteria />
						<Survey2024AboutCardPrecision />
					</div>
				</Section>
			</Surface>
		</div>
	);

	//
}
