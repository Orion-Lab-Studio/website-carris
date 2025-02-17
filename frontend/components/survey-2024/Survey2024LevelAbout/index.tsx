'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Survey2024AboutCardGroup } from '@/components/survey-2024/Survey2024AboutCardGroup';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function Survey2024LevelAbout() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey-2024.Survey2024Header');

	//
	// B. Render components

	return (
		<div id="aboutSurvey">
			<Surface forceOverflow>
				<Section withGap withPadding>
					<h2 className={styles.sectionTitle}>{t('AnchorAboutSurveyTitle')}</h2>
					<Survey2024AboutCardGroup />
				</Section>
			</Surface>
		</div>
	);

	//
}
