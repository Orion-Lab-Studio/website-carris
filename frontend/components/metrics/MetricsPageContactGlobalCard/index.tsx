/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

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

interface Props {
	allData: Complaints[]
}

export function MetricsPageContactsGlobalCard({ allData }: Props) {
	//

	//
	// A. Setup variables
	const t = useTranslations('metrics.MetricsPageContactsGlobalCard');
	// B. Render Components

	const renderTotalContacts = () => {
		const totalContactsLastWeek = allData.map(item => item.total);
		return (
			<div>
				<Text className={styles.totalContactsValue}>{totalContactsLastWeek}</Text>
				<Text className={styles.totalContactsDesciption}>{t('totalContactsDesc')}</Text>
			</div>
		);
	};

	const renderTotalPhoneContacts = () => {
		const totalPhoneContactsLastWeek = allData.map(item => item.phone);
		return (
			<div>
				<Text className={styles.totalPhoneContactsValue}>{totalPhoneContactsLastWeek}</Text>
				<Text className={styles.totalPhonrContactsDesciption}>{t('totalPhoneContactsDesc')}</Text>
			</div>
		);
	};

	const renderTotalEmailContacts = () => {
		const totalEmailContactsLastWeek = allData.map(item => item.email);
		return (
			<div>
				<Text className={styles.totalEmailContactsValue}>{totalEmailContactsLastWeek}</Text>
				<Text className={styles.totalEmailContactsDesciption}>{t('totalPhoneContactsDesc')}</Text>
			</div>
		);
	};

	const renderNoData = () => {
		return (
			<NoDataLabel text="No data available" />
		);
	};
	return (
		<Section withPadding>
			<div className={styles.container}>
				{!allData.length && renderNoData()}
				{renderTotalContacts()}
				{renderTotalPhoneContacts()}
				{renderTotalEmailContacts()}
			</div>
		</Section>
	);

	//
}
