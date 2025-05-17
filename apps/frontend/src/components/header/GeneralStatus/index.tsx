'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { type GeneralStatusMessage } from '@carrismetropolitana/website-shared-types';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function GeneralStatus() {
	//

	//
	// A. Fetch data

	const { data: generalStatusData } = useSWR<GeneralStatusMessage>('/admin/api/globals/general-status/public');

	//
	// B. Handle actions

	// const handleClick = () => {
	// 	if (appStatusData.more_info) {
	// 		window.open(appStatusData.more_info, '_blank');
	// 	}
	// };

	//
	// C. Render Components

	if (!generalStatusData) {
		return null;
	}

	return (
		<Surface variant="success">
			<Section heading={generalStatusData[0].title} variant="success" withPadding>
				<h3 className={styles.title}>Lorem ipsum dolor sit amet</h3>
			</Section>
		</Surface>
	);

	// return appStatusData && appStatusData.title && (
	// 	<div className={`${styles.container} ${appStatusData.more_info && styles.asLink} ${styles[`style_${appStatusData.style}`]}`} onClick={handleClick}>
	// 		<div className={styles.iconWrapper}>
	// 			{appStatusData.style === 'info' && <IconInfoCircleFilled className={styles.icon} size={22} />}
	// 			{appStatusData.style === 'ok' && <IconCircleCheckFilled className={styles.icon} size={22} />}
	// 			{appStatusData.style === 'warning' && <IconBellRingingFilled className={styles.icon} size={22} />}
	// 			{appStatusData.style === 'danger' && <IconAlertTriangleFilled className={styles.icon} size={22} />}
	// 		</div>
	// 		<div className={styles.messageWrapper}>
	// 			<h3 className={styles.title}>{appStatusData.title}</h3>
	// 		</div>
	// 	</div>
	// );

	//
}
