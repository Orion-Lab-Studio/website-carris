'use client';

/* * */

import { type SchoolData } from '@/types/school';
import { useMemo } from 'react';
import { Layer, Source } from 'react-map-gl/maplibre';

/* * */

interface Props {
	schoolData?: SchoolData
}

/* * */

export function MapViewSingleSchool({ schoolData }: Props) {
	//

	//
	// A. Transform data

	const schoolMarkerMapData: GeoJSON.FeatureCollection = useMemo(() => {
		if (!schoolData || !schoolData.lat || !schoolData.lon) {
			return {
				features: [],
				type: 'FeatureCollection',
			};
		}
		return {
			features: [{
				geometry: {
					coordinates: [parseFloat(schoolData.lon), parseFloat(schoolData.lat)],
					type: 'Point',
				},
				properties: {},
				type: 'Feature',
			}],
			type: 'FeatureCollection',
		};
	}, [schoolData]);

	//
	// B. Render components

	return (
		<Source data={schoolMarkerMapData} generateId={true} id="school-marker" type="geojson">
			<Layer
				id="school-marker-img"
				source="school-markers"
				type="symbol"
				layout={{
					'icon-allow-overlap': true,
					'icon-anchor': 'bottom',
					'icon-ignore-placement': true,
					'icon-image': 'school-marker',
					'icon-offset': [0, 5],
					'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.25, 20, 0.35],
					'symbol-placement': 'point',
				}}
				paint={{
					'icon-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 10, 1],
				}}
			/>
		</Source>
	);

	//
}
