/* * */

import { Loader } from '@/components/common/Loader';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { Tooltip } from '@mantine/core';
import { IconHeart, IconHeartFilled, IconHeartX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	classNames?: string
	color: string
	isActive: boolean | null
	onToggle: () => void
}

/* * */

export function FavoriteToggle({ color, isActive, onToggle }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.FavoriteToggle');

	const profileContext = useProfileContext();
	const analyticsContext = useAnalyticsContext();
	const consent = analyticsContext.data.is_enabled;

	//
	// B. Handle Actions
	const handleSetConsent = () => {
		console.log(consent);
		if (consent !== 'yes' && consent !== null) {
			analyticsContext.actions.reset();
		}
	};

	//
	// C. Render components

	if (profileContext.flags.is_loading) {
		return (
			<div className={styles.container}>
				<Loader visible />
			</div>
		);
	}

	if (!profileContext.flags.is_enabled) {
		return (
			<div className={`${styles.container} ${styles.disabled}`}>
				<Tooltip
					events={{ focus: true, hover: true, touch: true }}
					label={t('disabled')}
					withArrow
				>
					<IconHeartX onClickCapture={handleSetConsent} />
				</Tooltip>
			</div>
		);
	}

	if (isActive) {
		return (
			<div className={styles.container} onClick={onToggle} style={{ color: color }}>
				<IconHeartFilled />
			</div>
		);
	}

	return (
		<div className={styles.container} onClick={onToggle}>
			<IconHeart />
		</div>
	);

	//
}
