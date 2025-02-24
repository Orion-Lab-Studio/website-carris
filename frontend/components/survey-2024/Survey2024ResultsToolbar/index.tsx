'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { RangeSlider, Select, TextInput } from '@mantine/core';
import {
	IconFilter,
	IconSearch,
	IconX,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';

/* * */

export function Survey2024ResultsToolbar({ handleSearch }) {
	//

	//
	// A. Setup variables
	const [avaliationValue, setAvalitaionValue] = useQueryState('avaliation');
	const [category, setCategory] = useQueryState('category');
	const [search, setSearch] = useQueryState('search');
	const t = useTranslations('survey-2024.Survey2024ResultsToolbar');
	const filterCategories = [
		{ label: 'Paragens', value: 'info_stops' },
		{ label: 'Rede', value: 'info_rede' },
		{ label: 'Autocarros', value: 'info_bus' },
		{ label: 'Suporte', value: 'info_support' },
	];
	const marks = [
		{ label: '0', value: 0 },
		{ label: '1', value: 10 },
		{ label: '2', value: 20 },
		{ label: '3', value: 30 },
		{ label: '4', value: 40 },
		{ label: '5', value: 50 },
		{ label: '6', value: 60 },
		{ label: '7', value: 70 },
		{ label: '8', value: 80 },
		{ label: '9', value: 90 },
		{ label: '10', value: 100 },

	];

	//

	//
	// B. Handle Action

	const handleAvaliationValue = (value: [number, number]) => {
		setAvalitaionValue(JSON.stringify(value));
	};

	useEffect(() => {
		handleSearch(search, category, avaliationValue);
	}, [search, category, avaliationValue]);

	//
	// C. Render components

	return (
		<Grid columns="abc" withGap>
			<TextInput
				leftSection={<IconSearch size={20} />}
				onChange={e => setSearch(e.target.value)}
				placeholder={t('searchInput')}
				type="search"
				value={search || ''}
				w="100%"
				rightSection={
					search && (
						<IconX
							cursor="pointer"
							onClick={() => setSearch(null)}
							size={20}
						/>
					)
				}
			/>
			<Select
				data={filterCategories}
				leftSection={<IconFilter size={20} />}
				onChange={_value => setCategory(_value)}
				onClear={() => setCategory(null)}
				placeholder={t('by_category')}
				value={category}
				w="100%"
				clearable
			/>
			<div>
				<p>{t('by_avaliation')}</p>
				<RangeSlider
					color="#ffdd01"
					defaultValue={[0, 100]}
					marks={marks}
					onChange={_value => handleAvaliationValue(_value)}
					styles={{ thumb: { borderWidth: 4, padding: 3 } }}
					value={avaliationValue ? JSON.parse(avaliationValue) : [0, 100]}
					w="100%"
					restrictToMarks
				/>
			</div>
		</Grid>
	);

	//
}
