'use client';

/* * */

import { FoundItemsCounter } from '@/components/common/FoundItemsCounter';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('vehicles.VehiclesListToolbar');
	const vehiclesContext = useVehiclesContext();

	//
	// B. Transform data

	const filterByOptions = [
		{ label: t('filter_by.search'), value: 'search' },
	];

	//
	// C. Render components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withGap withPadding>
				<Grid columns="a" withGap>
					<TextInput placeholder={t('filter_by.search')} />
				</Grid>
				<FoundItemsCounter text={t('found_items_counter', { count: vehiclesContext.data.vehicles.length })} />
			</Section>
		</Surface>
	);

	//
}
