import { CopyBadge } from '@/components/common/CopyBadge';
import {
	IconBike,
	IconBikeOff,
	IconWheelchair,
	IconWheelchairOff,
} from '@tabler/icons-react';
import { Popup } from '@vis.gl/react-maplibre';

import styles from './styles.module.css';

export function VehicleListMapPopup({ selectedVehicle }) {
	return (
		<>

			<Popup
				key={selectedVehicle.id}
				anchor="left"
				className={styles.popupWrapper}
				closeButton={true}
				closeOnClick={true}
				latitude={selectedVehicle.lat}
				longitude={selectedVehicle.lon}
				maxWidth="none"
			>
				<div className={styles.iconList}>
					{selectedVehicle.bikes_allowed ? <IconBike /> : <IconBikeOff />}
					{selectedVehicle.wheelchair_accessible ? <IconWheelchair /> : <IconWheelchairOff />}
				</div>
				<CopyBadge
					label={`Sentados: ${selectedVehicle.capacity_seated ?? 0}`}
					value={selectedVehicle.capacity_seated ?? 0}
					hasBorder
				/>
				<CopyBadge
					label={`Em pé: ${selectedVehicle.capacity_standing ?? 0}`}
					value={selectedVehicle.capacity_standing ?? 0}
				/>
				<CopyBadge
					label={`Capacidade Total: ${selectedVehicle.capacity_total ?? 0}`}
					value={selectedVehicle.capacity_total ?? 0}
				/>
				<CopyBadge
					label={`Estado: ${selectedVehicle.current_status ?? 'Não definido'}`}
					value={selectedVehicle.current_status ?? 'Não definido'}
				/>
				<CopyBadge
					label={`Emissões: ${selectedVehicle.emission_class ?? 'Não definido'}`}
					value={selectedVehicle.emission_class ?? 'Não definido'}
				/>
				<CopyBadge
					label={`ID: ${selectedVehicle.id ?? 'Não definido'}`}
					value={selectedVehicle.id ?? 0}
				/>
				<CopyBadge
					label={`Marca: ${selectedVehicle.make ?? 'Não definido'}`}
					value={selectedVehicle.make ?? 'Não definido'}
				/>
				<CopyBadge
					label={`Modelo: ${selectedVehicle.model ?? 'Não definido'}`}
					value={selectedVehicle.model ?? 'Não definido'}
				/>
				<CopyBadge
					label={`Tipo de propulsão: ${selectedVehicle.propulsion ?? 'Não definido'}`}
					value={selectedVehicle.propulsion ?? 'Não definido'}
				/>
			</Popup>

		</>
	);
}
