'use client';

/* * */

import FoundItemsCounter from '@/components/common/FoundItemsCounter';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { useProfileListContext } from '@/contexts/ProfileList.context';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { SegmentedControl } from '@mantine/core';
import { useTranslations } from 'next-intl';

// import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables
	const t = useTranslations('favorites.PageToolbar');
	const profileListContext = useProfileListContext();
	const linesContext = useLinesListContext();
	const stopsContext = useStopsListContext();

	//
	// B. Transform data

	const currentViewOptions = [
		{ label: t('by_current_view.lines'), value: 'lines' },
		{ label: t('by_current_view.stops'), value: 'stops' },
	];

	//
	// D. Render components

	return (
		<Surface>
			<Section withPadding>
				<SegmentedControl data={currentViewOptions} onChange={profileListContext.actions.updateFilterByCurrentView} value={profileListContext.filters.by_current_view} fullWidth />
				{profileListContext.filters.by_current_view === 'lines' && (
					<FoundItemsCounter text={t('found_items_counter.lines', { count: linesContext.data.favorites.length })} />
				)}
				{profileListContext.filters.by_current_view === 'stops' && (
					<FoundItemsCounter text={t('found_items_counter.stops', { count: stopsContext.data.favorites.length })} />
				)}
			</Section>
		</Surface>
	);

	//
}
