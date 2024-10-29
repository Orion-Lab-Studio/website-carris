'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { LinesListViewFavorites } from '@/components/lines/LinesListViewFavorites';
import PageToolbar from '@/components/profile/favorites/PageToolbar';
import { StopsListViewFavorites } from '@/components/stops/StopsListViewFavorites';
import { useProfileListContext } from '@/contexts/ProfileList.context';
import { useTranslations } from 'next-intl';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.Page');
	const profileListContext = useProfileListContext();

	//
	// B. Render components

	return (
		<Surface>
			<Section heading={t('heading')} withPadding />
			<PageToolbar />
			{(!profileListContext.flags.is_loading && profileListContext.filters.by_current_view === 'lines') && <LinesListViewFavorites />}
			{(!profileListContext.flags.is_loading && profileListContext.filters.by_current_view === 'stops') && <StopsListViewFavorites />}
		</Surface>
	);

	//
}
