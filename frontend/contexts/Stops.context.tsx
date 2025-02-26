'use client';

/* * */

import type { Stop } from '@carrismetropolitana/api-types/network';

import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Routes } from '@/utils/routes';
import { Locality, Municipality } from '@carrismetropolitana/api-types/locations';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

import { useLocationsContext } from './Locations.context';

/* * */

interface StopsContextState {
	actions: {
		getAllStopsGeoJsonFC: () => GeoJSON.FeatureCollection | undefined
		getStopById: (stopId: string) => Stop | undefined
		getStopByIdGeoJsonFC: (stopId: string) => GeoJSON.FeatureCollection | undefined
	}
	data: {
		parsedStops: Stop[]
		stops: Stop[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const StopsContext = createContext<StopsContextState | undefined>(undefined);

export function useStopsContext() {
	const context = useContext(StopsContext);
	if (!context) {
		throw new Error('useStopsContext must be used within a StopsContextProvider');
	}
	return context;
}

/* * */

export const StopsContextProvider = ({ children }) => {
	//

	//
	// A. Fetch data
	const workerRef = useRef<null | Worker>(null);
	const { data: allStopsData, isLoading: allStopsLoading } = useSWR<Stop[], Error>(`${Routes.API}/stops`);
	const locationsContext = useLocationsContext();
	const [parsedStops, setParsedStops] = useState<Stop[]>([]);

	//
	// B. Transform Data

	useEffect(() => {
		if (!locationsContext.data.localitites || !allStopsData) return;

		if (!workerRef.current) {
			workerRef.current = new Worker(new URL('../workers/heavyJobs.ts', import.meta.url));

			workerRef.current.onmessage = (event: MessageEvent<Stop[]>) => {
				setParsedStops((prev) => {
					if (JSON.stringify(prev) === JSON.stringify(event.data)) {
						return prev;
					}
					return event.data;
				});
			};

			workerRef.current.onerror = (error) => {
				console.error('Worker error:', error);
			};
		}

		if (parsedStops.length === 0) {
			setLocalitiesNames(locationsContext.data.municipalities, locationsContext.data.localitites, allStopsData);
		}

		return () => {
			workerRef.current?.terminate();
			workerRef.current = null;
		};
	}, [locationsContext.data.localitites, allStopsData]);

	//
	// C. Handle actions

	const getStopById = (stopId: string): Stop | undefined => {
		return allStopsData?.find(stop => stop.id === stopId);
	};

	const getAllStopsGeoJsonFC = (): GeoJSON.FeatureCollection | undefined => {
		if (!allStopsData) return;
		const collection = getBaseGeoJsonFeatureCollection();
		allStopsData.forEach((stop) => {
			const stopFC = transformStopDataIntoGeoJsonFeature(stop);
			if (stopFC) collection.features.push(stopFC);
		});
		return collection;
	};

	const getStopByIdGeoJsonFC = (stopId: string): GeoJSON.FeatureCollection | undefined => {
		const stop = getStopById(stopId);
		if (!stop) return;
		const collection = getBaseGeoJsonFeatureCollection();
		const stopFC = transformStopDataIntoGeoJsonFeature(stop);
		if (stopFC) collection.features.push(stopFC);
		return collection;
	};

	const setLocalitiesNames = (allMunicipalities: Municipality[], allLocalitiesData: Locality[], stopsData: Stop[]) => {
		if (!workerRef.current) {
			console.error('Worker not initialized');
			return;
		}

		workerRef.current.onerror = (error) => {
			console.error('Worker error:', error);
		};

		workerRef.current.postMessage({ localities: allLocalitiesData, municipalities: allMunicipalities, stops: stopsData, type: 'stop_add_extra_fields' });
	};

	//
	// D. Define context value

	const contextValue: StopsContextState = {
		actions: {
			getAllStopsGeoJsonFC,
			getStopById,
			getStopByIdGeoJsonFC,
		},
		data: {
			parsedStops: parsedStops || [],
			stops: allStopsData || [],
		},
		flags: {
			is_loading: allStopsLoading,
		},
	};

	//
	// D. Render components

	return (
		<StopsContext.Provider value={contextValue}>
			{children}
		</StopsContext.Provider>
	);

	//
};

/* * */

export function transformStopDataIntoGeoJsonFeature(stopData: Stop): GeoJSON.Feature<GeoJSON.Point> {
	return {
		geometry: {
			coordinates: [stopData.lon, stopData.lat],
			type: 'Point',
		},
		properties: {
			current_status: stopData.operational_status,
			id: stopData.id,
			lat: stopData.lat,
			lon: stopData.lon,
			long_name: stopData.long_name,
		},
		type: 'Feature',
	};
}
