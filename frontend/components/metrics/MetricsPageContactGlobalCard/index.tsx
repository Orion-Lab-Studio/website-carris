/* * */

import { Section } from '@/components/layout/Section';
import { Complaints } from '@carrismetropolitana/api-types/metrics';
import { Text } from '@mantine/core';
import { IconAt, IconPhoneCheck } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';
/* * */

interface Props {
	allData: Complaints[]
	totalPassengersLastWeek: number
}

export function MetricsPageContactsGlobalCard({ allData, totalPassengersLastWeek }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPageContactsGlobalCard');

	//
	// C. Render Components

	const renderTotalPassegersByDay = () => {
		return (
			<div>
				<Text className={styles.totalPassengersContactsValue}>{t('total_passengers_day', { value: totalPassengersLastWeek })}</Text>
				<Text className={styles.totalPassengersContactsDescription}>{t('totalPassengersDayContactsDesc')}</Text>
			</div>
		);
	};

	const renderTotalContacts = () => {
		const totalContactsLastWeekSum = allData.reduce((acc, item) => acc + item.total, 0);
		return (
			<div>
				<Text className={styles.totalContactsValue}>{totalContactsLastWeekSum}</Text>
				<Text className={styles.totalContactsDescription}>{t('totalContactsDesc')}</Text>
			</div>
		);
	};

	const renderTotalPhoneContacts = () => {
		const totalContactsLastWeekSum = allData.reduce((acc, item) => acc + item.phone, 0);

		return (
			<div className={styles.totalPhoneContactsValuesWrapper}>
				<div className={styles.iconContainer}>
					<IconPhoneCheck className={styles.icon} size={50} />
				</div>
				<Text className={styles.totalPhoneContactsValue}>{totalContactsLastWeekSum}</Text>
				<Text className={styles.totalPhoneContactsDescription}>{t('totalPhoneContactsDesc')}</Text>
			</div>
		);
	};

	const renderTotalEmailContacts = () => {
		const totalContactsLastWeekSum = allData.reduce((acc, item) => acc + item.email, 0);

		return (
			<div className={styles.totalEmailContactsValuesWrapper}>
				<div className={styles.iconContainer}>
					<IconAt className={styles.icon} size={50} />
				</div>
				<Text className={styles.totalEmailContactsValue}>{totalContactsLastWeekSum}</Text>
				<Text className={styles.totalEmailContactsDescription}>{t('totalEmailContactsDesc')}</Text>
			</div>
		);
	};

	return (
		<Section>
			<div className={styles.container}>
				<div className={styles.globalCardFirstRow}>
					{renderTotalPassegersByDay()}
					{renderTotalContacts()}
				</div>
				{renderTotalPhoneContacts()}
				{renderTotalEmailContacts()}
			</div>
		</Section>
	);
	//
}
