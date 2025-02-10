'use client';

/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { VehicleListMapDetails } from '@/components/vehicles/VehiclesListMapDetails';
import { useLinesContext } from '@/contexts/Lines.context';
import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { useVehiclesListContext } from '@/contexts/VehiclesList.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function VehiclesListDetails() {
	//

	//
	// A. Setup variables

	const t = useTranslations('vehicles.VehiclesListDetails');

	const vehiclesContext = useVehiclesContext();
	const linesContext = useLinesContext();
	const vehiclesListContext = useVehiclesListContext();

	const selectedVehicleFromList = vehiclesListContext.data.selected;
	const selectedVehicle = selectedVehicleFromList && vehiclesContext.data.vehicles.find(vehicle => vehicle.id === selectedVehicleFromList.id);

	const lineData = linesContext.actions.getLineDataById(selectedVehicle?.line_id || '');

	//
	// C. Render components

	return (
		<Section withGap withPadding>
			{!selectedVehicle && (
				<div className={styles.noDataContainer}>
					<NoDataLabel text={t('no_data')} />
				</div>
			)}
			{selectedVehicle && (
				<VehicleListMapDetails lineData={lineData} selectedVehicle={selectedVehicle} />
			)}
		</Section>
	);

	//
}
