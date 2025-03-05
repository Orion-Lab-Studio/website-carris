import Button from '@/components/common/Button';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { IconArrowRight, IconDownload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

export function SurveyHeader() {
	//

	//
	// A. Setup Variables

	const t = useTranslations('survey.SurveyHeader');
	const anchorButtons = [
		{ href: '#aboutSurvey', name: 'AboutSurvey' },
		{ href: '#passangerChacterization', name: 'PassengerCaracter' },
		{ href: '#recomendationIndex', name: 'Index' },
		{ href: '#results', name: 'Results' },
	];

	//
	// B. Render Components
	const renderAnchorButtons = () => (
		<div className={styles.anchorButtonsContainer}>
			{anchorButtons.map((button, index) => (
				<Button
					key={index}
					href={button.href}
					label={t(`Anchor${button.name}`)}
					rightIcon={<IconArrowRight />}
				/>
			))}
		</div>
	);

	const renderDownloadButton = () => (
		<div className={styles.downloadButtonContainer}>
			<Button className={styles.downloadButton} icon={<IconDownload size={20} />} label={t('AnchorAboutSurveyTitle')} />
		</div>
	);

	const renderHeaderContent = () => (
		<div className={styles.cardContainer}>
			<div className={styles.globalSatisfactionText}>
				<p>{t('heading')}</p>
			</div>
			<div className={styles.header}>
				<div className={styles.leftColumn}>
					<div className={styles.squircle}>
						<div className={styles.circledNumber}>
							<div className={styles.blurredCircle} />
							<p className={styles.headerNumber}>{t('value')}</p>
						</div>
					</div>
				</div>
				<div className={styles.rightColumn}>
					<p className={styles.headerTitle}>{t('legend')}</p>
				</div>
			</div>
		</div>
	);

	return (
		<Surface>
			<Section withGap withPadding>
				<p className={styles.SurveyTitle}>{t('title')}</p>
				<p className={styles.SurveySubtitle}>{t('subtitle')}</p>
				{renderAnchorButtons()}
				{renderDownloadButton()}
			</Section>
			<Section withPadding>
				{renderHeaderContent()}
			</Section>
		</Surface>
	);
	//
}
