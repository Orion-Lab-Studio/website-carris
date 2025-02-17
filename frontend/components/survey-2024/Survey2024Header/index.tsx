/* * */

import Button from '@/components/common/Button';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { IconDownload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */
export function Survey2024Header() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey-2024.Survey2024Header');

	//
	// B. Render components

	return (
		<Surface>
			<Section withGap withPadding>

				<p className={styles.SurveyTitle}>{t('title')}</p>

				<div className={styles.anchorButtonsContainer}>
					<Button href="#aboutSurvey" label={t('AnchorAboutSurvey')} />
					<Button href="#passangerChacterization" label={t('AnchorPassengerCaracter')} />
					<Button href="#results" label={t('AnchorResults')} />
					<Button href="#recomendationIndex" label={t('AnchorIndex')} />
				</div>

				<div className={styles.downloadButtonContainer}>
					<Button className={styles.downloadButton} icon={<IconDownload size={20} />} label={t('AnchorAboutSurveyTitle')} />
				</div>

			</Section>
		</Surface>
	);

	//
}
