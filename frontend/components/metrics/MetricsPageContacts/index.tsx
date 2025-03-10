'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { MetricsPageContactsGlobalCard } from '@/components/metrics/MetricsPageContactGlobalCard';
import { MetricsPageContactsHeader } from '@/components/metrics/MetricsPageContactHeader';
import { MetricsContactsPage2024CardGroup } from '@/components/metrics/MetricsPageContactsCardGroup';
import { MetricsPageContactsToolbar } from '@/components/metrics/MetricsPageContactsToolbar';
import { useLinesContext } from '@/contexts/Lines.context';
import { Routes } from '@/utils/routes';
import { useTranslations } from 'next-intl';
import { use, useEffect, useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface Complaints {
	_id: number
	complaints: number
	email: number
	filter_value: string
	info_request: number
	other: number
	phone: number
	total: number
	type: string
}

export function MetricsPageContacts() {
	//

	//
	// A. Setup variables

	const [filter_type, setFilterType] = useState<string>('global');
	const [filter_value, setFilterValue] = useState<string>('-');
	const [filtered_data, setFilteredData] = useState<Complaints[]>([]);
	const [lineComplaints, setLines] = useState<Complaints[]>([]);
	const [municipalComplaints, setMunicipalities] = useState<Complaints[]>([]);
	const [globalComplaints, setGlobal] = useState<Complaints[]>([]);

	const t = useTranslations('metrics.MetricsPageContacts');

	const linesContext = useLinesContext();

	const { data: allComplaintsData, isLoading: loading } = useSWR(`${Routes.API}/metrics/complaints/`);

	//
	// B. Fetch Data
	useEffect(() => {
		if (loading) return;

		const line_complaints = allComplaintsData.filter(item => item.type === 'line' && item.filter_value === filter_value);
		const municipal_complaints = allComplaintsData.filter(item => item.type === 'municipality' && item.filter_value === filter_value);
		const global_complaints = allComplaintsData.filter(item => item.type === 'global');

		setLines(line_complaints);
		setMunicipalities(municipal_complaints);
		setGlobal(global_complaints);
		setFilterType('global');

		handleDataSetup();
	}, [allComplaintsData, filter_type, filter_value]);

	function handleDataSetup() {
		if (!allComplaintsData || loading) return;

		switch (filter_type) {
			case 'global':
				setFilteredData(globalComplaints);
				break;
			case 'line':
				setFilteredData(lineComplaints);
				break;
			case 'municipality':
				setFilteredData(municipalComplaints);
				break;
			default:
		}
	};

	useEffect(() => {
		console.log(filtered_data);
	}, [filtered_data]);
	//
	// C. Handle Actions

	function handleFilterChange(value: string) {
		if (value === filter_type && !value) {
			setFilterType('global');
		};
		setFilterType(value);
	}

	//
	// D. Render Components
	return (
		<Surface>
			<div id="contactsMetrics">
				<Section heading={t('heading')} withPadding="desktop" withGap>
					<div className={styles.description}>
						<p>{t('text1')} </p>
					</div>
					<div className={styles.container}>
						<MetricsPageContactsGlobalCard allData={globalComplaints} />
						<MetricsPageContactsToolbar allLines={linesContext.data.lines} filter_type={handleFilterChange} filter_value={setFilterValue} />
						{/* <MetricsPageContactsHeader data={filtered_data} /> */}
						<MetricsContactsPage2024CardGroup data={filtered_data} />
						{/* <MetricsContactsCards data={allComplaintsData} />
					*/}
					</div>
				</Section>
			</div>
		</Surface>

	);

	//
}
