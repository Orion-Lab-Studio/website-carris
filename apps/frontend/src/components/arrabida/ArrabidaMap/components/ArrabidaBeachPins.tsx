'use client';

/* * */

import { Marker } from '@vis.gl/react-maplibre';

import { type BeachPin } from '../types';
import { AlbarquelPin, CreiroPin, FigueirinhaPin, GalaposPin } from './BeachPins';

/* * */

interface ArrabidaBeachPinsProps {
	currentZoom: number
	onPinClick: (beachId: string) => void
	selectedAccordionId?: string
}

/* * */

const BEACH_PINS: BeachPin[] = [
	{
		accordionId: 'praia-albarquel',
		coordinates: [-8.9728, 38.4797],
		id: 'albarquel',
		lineIds: ['4474', '4414', '4415', '4471'],
		name: 'Praia de Albarquel',
	},
	{
		accordionId: 'praia-figueirinha',
		coordinates: [-8.9156, 38.4631],
		id: 'figueirinha',
		lineIds: ['4474'],
		name: 'Praia da Figueirinha',
	},
	{
		accordionId: 'praia-galapos-galapinhos',
		coordinates: [-8.8542, 38.4889],
		id: 'galapos',
		lineIds: ['4477'],
		name: 'Praia dos Galápos',
	},
	{
		accordionId: 'praia-creiro',
		coordinates: [-8.8283, 38.5019],
		id: 'creiro',
		lineIds: ['4470', '4477'],
		name: 'Praia do Creiro',
	},
];

/* * */

function renderBeachPin(beach: BeachPin, isActive: boolean, currentZoom: number) {
	const commonProps = { isActive, zoom: currentZoom };

	switch (beach.id) {
		case 'albarquel':
			return <AlbarquelPin {...commonProps} />;
		case 'creiro':
			return <CreiroPin {...commonProps} />;
		case 'figueirinha':
			return <FigueirinhaPin {...commonProps} />;
		case 'galapos':
			return <GalaposPin {...commonProps} />;
		default:
			return (
				<div style={{ cursor: 'pointer' }}>
					<div>🏖️</div>
					<div>{beach.name.split(' ').pop()}</div>
				</div>
			);
	}
}

/* * */

export function ArrabidaBeachPins({ currentZoom, onPinClick, selectedAccordionId }: ArrabidaBeachPinsProps) {
	//

	//
	// A. Render components

	return (
		<>
			{BEACH_PINS.map((beach) => {
				const isActive = selectedAccordionId === beach.accordionId;
				return (
					<Marker
						key={beach.id}
						anchor="center"
						latitude={beach.coordinates[1]}
						longitude={beach.coordinates[0]}
						onClick={() => onPinClick(beach.id)}
					>
						{renderBeachPin(beach, isActive, currentZoom)}
					</Marker>
				);
			})}
		</>
	);

	//
}
