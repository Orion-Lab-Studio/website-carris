'use client';

import TextPopover from '@/components/common/TextPopover';
import { useMapOptionsContext } from '@/contexts/MapOptions.context';
import { SegmentedControl, SegmentedControlItem } from '@mantine/core';
import { IconArrowsMinimize, IconMapShare } from '@tabler/icons-react';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

interface Props {
	className?: string
	onCenterMap?: () => void
}

export function MapViewToolbar({ className, onCenterMap }: Props) {
	//
	// A. Setup variables
	const mapOptionsContext = useMapOptionsContext();
	const t = useTranslations('map.toolbar');
	const mapStyles: SegmentedControlItem[] = [
		{ label: t('style.map'), value: 'map' },
		{ label: t('style.satellite'), value: 'satellite' },
	];

	//
	// B. Transform data

	//
	// C. Handle events
	const handleOpenInGoogle = () => {
		const map = mapOptionsContext.data.map;
		if (!map) return;

		const center = map.getCenter();
		window.open(`https://www.google.com/maps?q=${center.lat},${center.lng}&z=${map.getZoom() + 2}`, '_blank');
	};

	//
	// D. Render component
	return (
		<div className={classNames(styles.container, className)}>
			<SegmentedControl classNames={{ label: styles.segmentedControlLabel }} data={mapStyles} onChange={mapOptionsContext.actions.setStyle} value={mapOptionsContext.data.style} />
			{onCenterMap && (
				<button className={styles.button} onClick={onCenterMap}>
					<TextPopover text={t('center_map')} textSize="md">
						<IconArrowsMinimize />
					</TextPopover>
				</button>
			)}
			<button className={styles.button} onClick={handleOpenInGoogle}>
				<TextPopover text={t('open_google_maps')} textSize="md">
					<IconMapShare />
				</TextPopover>
			</button>
		</div>
	);
}
