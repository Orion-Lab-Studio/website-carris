'use client';

/* * */

import { useEnvironmentContext } from '@/contexts/Environment.context';
import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function AppNaveganteStartupWelcome() {
	//

	//
	// A. Setup variables

	const t = useTranslations('app-navegante.AppNaveganteStartupWelcome');
	const environmentContext = useEnvironmentContext();

	//
	// B. Handle actions

	const handleClose = () => {
		if (environmentContext.data.value === 'app-ios') {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).webkit.messageHandlers.closeButtonClicked.postMessage('');
		}
		if (environmentContext.data.value === 'app-android') {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).Android.closeButtonClicked();
		}
	};

	//
	// C. Render components

	return (
		<div className={styles.container}>

			<video className={styles.video} autoPlay loop muted>
				<source src="/assets/app-navegante/startup/welcome/video.mp4" type="video/mp4" />
			</video>

			<div className={styles.actionsWrapper}>
				<Button component={Link} href="https://www.navegante.pt/informar/noticias/passes-navegante-nao-aumentam-desde-2019" target="_blank">
					{t('actions.learn_more')}
				</Button>
				<Button onClick={handleClose} variant="secondary">
					{t('actions.close')}
				</Button>
			</div>

		</div>
	);

	//
}
