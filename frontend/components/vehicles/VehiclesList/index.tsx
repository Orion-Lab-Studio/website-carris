'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import VehiclesListMap from '@/components/vehicles/VehiclesListMap';
import VehiclesListToolbar from '@/components/vehicles/VehiclesListToolbar';
import { useTranslations } from 'next-intl';

import { VehiclesListInfoBlock } from '../VehicleListInfoBlock';
import styles from './styles.module.css';

/* * */

export function VehiclesList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('vehicles.VehiclesList');

	//
	// B. Render components

	return (
		<>
			<Surface>
				<Section heading={t('heading')} subheading={t('subheading')} />
			</Surface>
			<Surface>
				<Section withGap withPadding>
					<VehiclesListInfoBlock />
				</Section>
			</Surface>
			<Surface>
				<div className={styles.container}>
					<VehiclesListMap />
					<div className={styles.sidebarWrapper}>
						<VehiclesListToolbar />
					</div>
				</div>
			</Surface>
		</>
	);

	//
}
