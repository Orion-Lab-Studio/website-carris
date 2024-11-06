'use client';

/* * */

import { MapView } from '@/components/map/MapView';
import { MapViewStyleActiveStops } from '@/components/map/MapViewStyleActiveStops';
import { MapViewStylePath, MapViewStylePathInteractiveLayerId } from '@/components/map/MapViewStylePath';
import { MapViewStyleVehicles } from '@/components/map/MapViewStyleVehicles';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { transformStopDataIntoGeoJsonFeature, useStopsContext } from '@/contexts/Stops.context';
import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { centerMap, getBaseGeoJsonFeatureCollection, moveMap } from '@/utils/map.utils';
import { useEffect, useMemo, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';

/* * */

export function LinesDetailPathMap() {
	//

	//
	// A. Setup variables

	const stopsContext = useStopsContext();
	const vehiclesContext = useVehiclesContext();
	const linesDetailContext = useLinesDetailContext();

	const { linesDetailMap } = useMap();

	const [isInitialMapLoad, setIsInitialMapLoad] = useState(true);

	//
	// B. Transform Data

	const activeVehiclesGeojson = useMemo(() => {
		if (!linesDetailContext.data.active_pattern_group?.id) return;
		return vehiclesContext.actions.getVehiclesByPatternIdGeoJsonFC(linesDetailContext.data.active_pattern_group?.id);
	}, [linesDetailContext.data.active_pattern_group, vehiclesContext.data.vehicles]);

	const activePathStopsGeoJson = useMemo(() => {
		if (!linesDetailContext.data.active_pattern_group?.path) return;
		const collection = getBaseGeoJsonFeatureCollection();
		linesDetailContext.data.active_pattern_group.path.forEach((pathStop) => {
			const stopData = stopsContext.actions.getStopById(pathStop.stop_id);
			if (!stopData) return;
			const result = transformStopDataIntoGeoJsonFeature(stopData);
			result.properties = {
				...result.properties,
				color: linesDetailContext.data.active_pattern_group?.color,
				text_color: linesDetailContext.data.active_pattern_group?.text_color,
			};
			collection.features.push(result);
		});
		return collection;
	}, [linesDetailContext.data.active_pattern_group, vehiclesContext.data.vehicles]);

	const activeStopGeoJson = useMemo(() => {
		if (!linesDetailContext.data.active_stop || !linesDetailContext.data.active_pattern_group) return;
		const collection = getBaseGeoJsonFeatureCollection();
		const result = transformStopDataIntoGeoJsonFeature(linesDetailContext.data.active_stop.stop);
		result.properties = {
			...result.properties,
			color: linesDetailContext.data.active_pattern_group.color,
			text_color: linesDetailContext.data.active_pattern_group.text_color,
		};
		collection.features.push(result);
		return collection;
	}, [linesDetailContext.data.active_stop, linesDetailContext.data.active_pattern_group]);

	//
	// C. Handle Actions

	useEffect(() => {
		// On init, center the map on the full shape.
		// On subsequent iterations, move map to the selected stop.
		if (isInitialMapLoad) {
			if (!linesDetailContext.data.active_shape?.geojson) return;
			centerMap(linesDetailMap, [linesDetailContext.data.active_shape.geojson], { padding: 60 });
			setIsInitialMapLoad(false);
		}
		else {
			if (!linesDetailContext.data.active_stop?.stop) return;
			moveMap(linesDetailMap, [linesDetailContext.data.active_stop.stop.lon, linesDetailContext.data.active_stop?.stop.lat]);
		}
	}, [linesDetailMap, linesDetailContext.data.active_stop, linesDetailContext.data.active_shape]);

	function handleLayerClick(event) {
		if (!linesDetailMap) return;
		const features = linesDetailMap.queryRenderedFeatures(event.point, { layers: [MapViewStylePathInteractiveLayerId] });
		if (!features.length) return;
		for (const feature of features) {
			if (feature.properties.id === linesDetailContext.data.active_stop?.stop.id) {
				continue;
			}
			else {
				linesDetailContext.actions.setActiveStopByStopId(feature.properties.sequence, feature.properties.id);
				return;
			}
		}
	}

	//
	// D. Render copmonents

	return (
		<MapView
			id="linesDetailMap"
			interactiveLayerIds={[MapViewStylePathInteractiveLayerId]}
			onClick={handleLayerClick}
		>

			<MapViewStylePath
				shapeData={linesDetailContext.data.active_shape?.geojson}
				stopsData={activePathStopsGeoJson}
			/>

			<MapViewStyleActiveStops
				stopsData={activeStopGeoJson}
			/>

			<MapViewStyleVehicles
				showCounter="always"
				vehiclesData={activeVehiclesGeojson}
			/>

		</MapView>
	);

	//
}
