'use client';

/* * */

import { MupiStopsListToolbar } from '@/components/stops/MupiStopsListToolbar';
import { StopsListViewAll } from '@/components/stops/StopsListViewAll';
import { StopsListViewFavorites } from '@/components/stops/StopsListViewFavorites';
import { StopsListViewMap } from '@/components/stops/StopsListViewMap';
import { StopsListViewSkeleton } from '@/components/stops/StopsListViewSkeleton';
import { useStopsListContext } from '@/contexts/StopsList.context';

/* * */

export function MupiStopsList() {
	//

	//
	// A. Setup variables

	const stopsListContext = useStopsListContext();

	//
	// B. Render components

	return (
		<>
			<MupiStopsListToolbar />
			{stopsListContext.flags.is_loading && <StopsListViewSkeleton />}
			{(!stopsListContext.flags.is_loading && stopsListContext.filters.by_current_view === 'list') && <StopsListViewAll />}
			{(!stopsListContext.flags.is_loading && stopsListContext.filters.by_current_view === 'map') && <StopsListViewMap />}
			{(!stopsListContext.flags.is_loading && stopsListContext.filters.by_current_view === 'favorites') && <StopsListViewFavorites />}
		</>
	);

	//
}
