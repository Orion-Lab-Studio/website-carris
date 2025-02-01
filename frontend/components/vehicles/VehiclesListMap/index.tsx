'use client';

import { MapView } from '@/components/map/MapView';
import { MapViewStylePath } from '@/components/map/MapViewStylePath';
import {
	MapViewStyleVehicles,
	MapViewStyleVehiclesInteractiveLayerId,
	MapViewStyleVehiclesPrimaryLayerId,
} from '@/components/map/MapViewStyleVehicles';
import { transformStopDataIntoGeoJsonFeature, useStopsContext } from '@/contexts/Stops.context';
import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { useVehiclesListContext } from '@/contexts/VehiclesList.context';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Routes } from '@/utils/routes';
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';

import { VehicleListMapPopup } from '../VehiclesListMapPopup';

export default function Component() {
	// A. Setup variables
	const vehiclesListContext = useVehiclesListContext();
	const vehiclesContext = useVehiclesContext();
	const stopsContext = useStopsContext();
	const [activePathShapeGeoJson, setActivePathShapeGeoJson] = useState<Feature<Geometry, GeoJsonProperties> | FeatureCollection<Geometry, GeoJsonProperties> | undefined>(undefined);
	const selectedVehicleFromList = vehiclesListContext.data.selected;
	const selectedVehicle = selectedVehicleFromList && vehiclesContext.data.vehicles.find(vehicle => vehicle.id === selectedVehicleFromList.id);

	// B. Fetch Data
	const findTodaysDate = () => DateTime.now().toFormat('yyyyLLdd');

	const fetchPattern = async (patternId) => {
		const date = await findTodaysDate();
		if (patternId) {
			const actualPattern = await fetch(`${Routes.API}/patterns/${patternId}`).then(res => res.json());
			const isAvailable = actualPattern.filter(item => item.valid_on.includes(date));
			return isAvailable;
		}
	};

	const fetchShape = async (id) => {
		if (id) {
			console.log(id);
			const shape = await fetch(`${Routes.API}/shapes/${id[0].shape_id}`).then(res => res.json());
			return shape.geojson;
		}
	};

	const activeVehiclesGeoJson = useMemo(() => {
		if (vehiclesListContext.data.filtered && vehiclesListContext.data.filtered.length > 0) {
			const features: Feature<Geometry, GeoJsonProperties>[] = [];
			vehiclesListContext.data.filtered.forEach((vehicle) => {
				const fc = vehiclesContext.actions.getVehicleByIdGeoJsonFC(vehicle.id);
				if (fc && fc.features && fc.features.length > 0) {
					features.push(fc.features[0]);
				}
			});
			return { features, type: 'FeatureCollection' as const };
		}
		else {
			return vehiclesContext.actions.getAllVehiclesGeoJsonFC();
		}
	}, [vehiclesListContext.data.filtered, vehiclesContext.data.vehicles]);

	// const activePathFeatureCollection = useMemo(() => {
	// 	if (!linesDetailContext.data.active_pattern?.path) return;
	// 	const collection = getBaseGeoJsonFeatureCollection();
	// 	linesDetailContext.data.active_pattern.path.forEach((pathStop) => {
	// 		const stopData = stopsContext.actions.getStopById(pathStop.stop_id);
	// 		if (!stopData) return;
	// 		const result = transformStopDataIntoGeoJsonFeature(stopData);
	// 		result.properties = {
	// 			...result.properties,
	// 			color: vehiclesContext.data.vehicles.map(item => ),
	// 			sequence: pathStop.stop_sequence,
	// 			text_color: linesDetailContext.data.active_pattern?.text_color,
	// 		};
	// 		collection.features.push(result);
	// 	});
	// 	return collection;
	// }, [linesDetailContext.data.active_pattern, vehiclesContext.data.vehicles]);

	useEffect(() => {
		const fetchData = async () => {
			const patternId = vehiclesListContext.data.selected?.pattern_id;
			if (!patternId) return;
			const shapeId = await fetchPattern(patternId);
			if (!shapeId) return;
			const shapeGeoJson = await fetchShape(shapeId);
			setActivePathShapeGeoJson(shapeGeoJson);
		};

		fetchData();
	}, [vehiclesListContext.data.selected]);

	// C. Handle actions
	function handleLayerClick(event) {
		if (event.features.length !== 0) {
			vehiclesListContext.actions.updateSelectedVehicle(event.features[0].properties.id);
		}
	}

	// D. Render component
	return (
		<MapView
			id="vehiclesListMap"
			interactiveLayerIds={[MapViewStyleVehiclesInteractiveLayerId]}
			onClick={handleLayerClick}
		>
			<MapViewStyleVehicles vehiclesData={activeVehiclesGeoJson} />

			<MapViewStylePath
				presentBeforeId={MapViewStyleVehiclesPrimaryLayerId}
				shapeData={activePathShapeGeoJson}
				// waypointsData={activePathFeatureCollection}
			/>
			{selectedVehicle && (
				<VehicleListMapPopup selectedVehicle={selectedVehicle} />
			)}
		</MapView>
	);
}
