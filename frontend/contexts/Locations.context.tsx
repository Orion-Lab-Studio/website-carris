'use client';

/* * */

import type { District, Locality, Municipality, Region } from '@carrismetropolitana/api-types/locations';

import { Routes } from '@/utils/routes';
import { createContext, useContext } from 'react';
import useSWR from 'swr';

/* * */

interface LocationsContextState {
	actions: {
		getDistrictById: (districtId: string) => District | undefined
		getLocalityById: (localityId: string) => Locality | undefined
		getMunicipalityById: (municipalityId: string) => Municipality | undefined
		getRegionById: (regionId: string) => Region | undefined
	}
	data: {
		districts: District[]
		localitites: Locality[]
		municipalities: Municipality[]
		regions: Region[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const LocationsContext = createContext<LocationsContextState | undefined>(undefined);

export function useLocationsContext() {
	const context = useContext(LocationsContext);
	if (!context) {
		throw new Error('useLocationsContext must be used within a LocationsContextProvider');
	}
	return context;
}

/* * */

export const LocationsContextProvider = ({ children }) => {
	//

	//
	// A. Fetch data

	const { data: allRegionsData, isLoading: allRegionsLoading } = useSWR<Region[], Error>(`${Routes.API}/locations/regions`);
	const { data: allDistrictsData, isLoading: allDistrictsLoading } = useSWR<District[], Error>(`${Routes.API}/locations/districts`);
	const { data: allMunicipalitiesData, isLoading: allMunicipalitiesLoading } = useSWR<Municipality[], Error>(`${Routes.API}/locations/municipalities`);
	const { data: allLocalitiesData, isLoading: allLocalitiesLoading } = useSWR<Locality[], Error>(`${Routes.API}/locations/localities`);

	//
	// B. Handle actions

	const getRegionById = (regionId: string): Region | undefined => {
		return allRegionsData?.find(item => item.id === regionId);
	};

	const getDistrictById = (districtId: string): District | undefined => {
		return allDistrictsData?.find(item => item.id === districtId);
	};

	const getMunicipalityById = (municipalityId: string): Municipality | undefined => {
		return allMunicipalitiesData?.find(item => item.id === municipalityId);
	};

	const getLocalityById = (localityId: string): Locality | undefined => {
		return allLocalitiesData?.find(item => item.id === localityId);
	};

	//
	// C. Define context value

	const contextValue: LocationsContextState = {
		actions: {
			getDistrictById,
			getLocalityById,
			getMunicipalityById,
			getRegionById,
		},
		data: {
			districts: allDistrictsData || [],
			localitites: allLocalitiesData || [],
			municipalities: allMunicipalitiesData || [],
			regions: allMunicipalitiesData || [],
		},
		flags: {
			is_loading: allRegionsLoading || allDistrictsLoading || allMunicipalitiesLoading || allLocalitiesLoading,
		},
	};

	//
	// D. Render components

	return (
		<LocationsContext.Provider value={contextValue}>
			{children}
		</LocationsContext.Provider>
	);

	//
};
