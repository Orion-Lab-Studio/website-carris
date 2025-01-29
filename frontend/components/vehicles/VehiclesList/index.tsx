'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import VehiclesListToolbar from '@/components/vehicles/VehicleListToolbar';
import VehiclesListGroups from '@/components/vehicles/VehiclesListGroups';
import VehiclesListMap from '@/components/vehicles/VehiclesListMap';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<>
			<VehiclesListToolbar />
			<Surface>
				<Section>
					<div className={styles.contentWrapper}>
						<div className={styles.groupsWrapper}>
							<VehiclesListGroups />
						</div>
						<div className={styles.mapWrapper}>
							<VehiclesListMap />
						</div>
					</div>
				</Section>
			</Surface>
		</>
	);
}
