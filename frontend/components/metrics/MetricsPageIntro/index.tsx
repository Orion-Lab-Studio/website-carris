'use client';

/* * */

import { BackButton } from '@/components/common/BackButton';
import Button from '@/components/common/Button';
import { LottiePlayer } from '@/components/common/LottiePlayer';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function MetricsPageIntro() {
	//

	//
	// A. Fetch Data

	const t = useTranslations('metrics.MetricsPageIntro');

	//
	// B. Render components

	return (
		<Surface>
			<Section withBottomDivider withPadding>
				<BackButton href="/" />
			</Section>
			<Section heading={t('heading')} withGap withPadding>
				<p className={styles.text}>{t('text_1')}</p>
				<p className={styles.text}>{t('text_2')}</p>
				<div className={styles.anchorsWrapper}>
					<Button href="#aboutOpenData" icon={<LottiePlayer className={styles.lottie} path="/assets/tickets/animations/proxima.json" loop play />} label="Sobre Os Dados Abertos" />
					<Button href="#passengerMetrics" icon={<LottiePlayer className={styles.lottie} path="/assets/tickets/animations/proxima.json" loop play />}label="Total de Passageiros" />
					<Button href="#passengerRecords" icon={<LottiePlayer className={styles.lottie} path="/assets/tickets/animations/proxima.json" loop play />} label="Recordes Batidos" />
					<Button href="#linesMetrics" icon={<LottiePlayer className={styles.lottie} path="/assets/tickets/animations/proxima.json" loop play />} label="Linhas Mais Utilizadas" />
					<Button href="#serviceMetrics" icon={<LottiePlayer className={styles.lottie} path="/assets/tickets/animations/proxima.json" loop play />} label="Viagens Realizadas" />
					<Button href="#contactsMetrics" icon={<LottiePlayer className={styles.lottie} path="/assets/tickets/animations/proxima.json" loop play />} label="Contactos" />
				</div>
			</Section>
		</Surface>
	);

	//
}
