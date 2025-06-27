'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { Marker, useMap } from 'react-map-gl/maplibre';

import { MapView } from '../map/MapView';
import { SchoolData } from '../SchoolInfoUpdate/types';

export default function InfoUpdateMap({ schoolData }: { schoolData: SchoolData }) {
	//

	//
	// A. Setup variables

	const { schoolInfoMap } = useMap();

	//
	// B. Fetch data

	//
	// C. Transform data

	useEffect(() => {
		if (!schoolInfoMap || !schoolData) return;
		schoolInfoMap.flyTo({
			center: [parseFloat(schoolData.lon), parseFloat(schoolData.lat)],
			speed: 0.5,
			zoom: 15,
		});
	}, [schoolData, schoolInfoMap]);

	//
	// D. Handle actions

	const handleMapMouseEnter = (event) => {
		if (event?.features[0].properties?.id) {
			schoolInfoMap.getCanvas().style.cursor = 'pointer';
		}
	};

	const handleMapMouseLeave = (event) => {
		if (event?.features[0].properties?.id) {
			schoolInfoMap.getCanvas().style.cursor = 'default';
		}
	};

	//
	// F. Render components

	return (
		schoolData
		&& (
			<MapView
				id="schoolInfoMap"
				onMouseEnter={handleMapMouseEnter}
				onMouseLeave={handleMapMouseLeave}
				scale
				scrollZoom
				toolbar
			>
				<Marker latitude={parseFloat(schoolData.lat)} longitude={parseFloat(schoolData.lon)}>
					<Image alt={schoolData.name} height="50" src="/images/escola.png" width="50" priority />
				</Marker>
			</MapView>
		)

	);

	//
}
