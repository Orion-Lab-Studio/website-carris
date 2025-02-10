'use client';

/* * */

import { ExpandToggle } from '@/components/common/ExpandToggle';
import { FoundItemsCounter } from '@/components/common/FoundItemsCounter';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { useVehiclesListContext } from '@/contexts/VehiclesList.context';
import { MultiSelect, Select, TextInput } from '@mantine/core';
import { IconArrowLoopRight, IconBike, IconGasStation, IconTriangle, IconUser, IconWheelchair } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

/* * */

export function VehiclesListToolbar() {
	//

	//
	// A. Setup variables

	const t = useTranslations('vehicles.VehiclesListToolbar');
	const vehiclesListContext = useVehiclesListContext();

	//
	// B. Handle Actions

	const handleTextInputChange = ({ currentTarget }) => {
		vehiclesListContext.actions.updateFilterBySearch(currentTarget.value);
	};

	const handleBikesAllowedInputChange = (option: string) => {
		vehiclesListContext.actions.updateFilterByIsBikeAllowed(option);
	};

	const handleReducedMobilityChange = (option: string) => {
		vehiclesListContext.actions.updateFilterByWheelchair(option);
	};

	const handleAgencyIdChange = (option: string[]) => {
		vehiclesListContext.actions.updateFilterByAgency(option);
	};

	const handleMakeAndModelChange = (option: string[]) => {
		vehiclesListContext.actions.updateFilterByMakeAndModel(option);
	};

	const handlePropulsionChange = (option: string[]) => {
		vehiclesListContext.actions.updateFilterByPropulsion(option);
	};

	//
	// C. Render components

	return (
		<Section withBottomDivider withGap withPadding>
			<Grid columns="a" withGap>
				<TextInput leftSection={<IconArrowLoopRight size={20} />} onChange={handleTextInputChange} placeholder={t('filter_by.search')} type="search" value={vehiclesListContext.filters.by_search} />
				<MultiSelect
					data={vehiclesListContext.data?.propulsions?.map(p => ({ label: p.name, value: p.name })) || []}
					leftSection={<IconGasStation size={20} />}
					onChange={handlePropulsionChange}
					placeholder={t('filter_by.propulsion')}
					radius="sm"
					value={vehiclesListContext.filters.by_propulsion?.split(' ') || []}
					clearable
					searchable
				/>
			</Grid>

			<ExpandToggle defaultState={!!vehiclesListContext.filters.by_agency || !!vehiclesListContext.filters.by_isBicicleAllowed || !!vehiclesListContext.filters.by_isWheelchairAcessible || !!vehiclesListContext.filters.by_makeAndModel}>
				<Grid columns="a" withGap>
					<Select
						leftSection={<IconWheelchair size={20} />}
						onChange={handleReducedMobilityChange}
						placeholder={t('filter_by.wheel_chair')}
						radius="sm"
						value={vehiclesListContext.filters.by_isWheelchairAcessible}
						data={[
							{ label: 'Não', value: 'false' },
							{ label: 'Sim', value: 'true' },
						]}
						clearable
						searchable
					/>
					<Select
						leftSection={<IconBike size={20} />}
						onChange={handleBikesAllowedInputChange}
						placeholder={t('filter_by.bicycle')}
						radius="sm"
						value={vehiclesListContext.filters.by_isBicicleAllowed}
						data={[
							{ label: 'Não', value: 'false' },
							{ label: 'Sim', value: 'true' },
						]}
						clearable
						searchable
					/>
					<MultiSelect
						data={vehiclesListContext.data?.agencies?.map(a => ({ label: a.name, value: a.agency_id.toString() })) || []}
						leftSection={<IconUser size={20} />}
						onChange={handleAgencyIdChange}
						placeholder={t('filter_by.operator')}
						radius="sm"
						value={vehiclesListContext.filters.by_agency?.split(' ') || []}
						clearable
						searchable
					/>
					<MultiSelect
						leftSection={<IconTriangle size={20} />}
						onChange={handleMakeAndModelChange}
						placeholder={t('filter_by.make_model')}
						radius="sm"
						value={vehiclesListContext.filters.by_makeAndModel?.split(',') || []}
						data={
							vehiclesListContext.data?.makes_and_models?.map(make => ({
								group: make.name,
								items: make.models.map(model => ({
									label: model.name,
									value: `${make.name}-${model.name}`,
								})),
							})) || []
						}
						clearable
						searchable
					/>
				</Grid>
			</ExpandToggle>
			<FoundItemsCounter text={t('found_items_counter', { count: vehiclesListContext.data.filtered.length })} />
		</Section>
	);

	//
}
