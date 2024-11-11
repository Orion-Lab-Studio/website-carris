/* * */

import { Surface } from '@/components/layout/Surface';
import { MapView } from '@/components/map/MapView';
import { MapViewStyleStops, MapViewStyleStopsInteractiveLayerId } from '@/components/map/MapViewStyleStops';
import { transformStopDataIntoGeoJsonFeature } from '@/contexts/Stops.context';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { centerMap, getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useMap } from 'react-map-gl/maplibre';

/* * */

export function StopsListViewMap() {
	//

	//
	// A. Setup variables

	const { stopsListMap } = useMap();
	const router = useRouter();
	const stopsListContext = useStopsListContext();

	//
	// B. Transform data

	const allStopsFeatureCollection = useMemo(() => {
		const collection = getBaseGeoJsonFeatureCollection();
		stopsListContext.data.filtered.forEach(stop => collection.features.push(transformStopDataIntoGeoJsonFeature(stop)));
		return collection;
	}, [stopsListContext.data.filtered]);

	//
	// C. Handle Actions

	useEffect(() => {
		if (!allStopsFeatureCollection || !stopsListMap) return;
		centerMap(stopsListMap, allStopsFeatureCollection.features);
	}, [allStopsFeatureCollection, stopsListMap]);

	function handleLayerClick(event) {
		if (!stopsListMap) return;
		const features = stopsListMap.queryRenderedFeatures(event.point);
		if (!features.length) return;
		for (const feature of features) {
			if (feature.layer.id === MapViewStyleStopsInteractiveLayerId) {
				router.push(`/stops/${feature.properties.id}`);
				return;
			}
		}
	}

	//
	// D. Render components

	return (
		<Surface variant="persistent" forceOverflow>
			<div style={{ height: 600 }}>
				<MapView
					id="stopsListMap"
					interactiveLayerIds={[MapViewStyleStopsInteractiveLayerId]}
					onClick={handleLayerClick}
				>
					<MapViewStyleStops stopsData={allStopsFeatureCollection} />
				</MapView>
			</div>
		</Surface>
	);

	//
}
