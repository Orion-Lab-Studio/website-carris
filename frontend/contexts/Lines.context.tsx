'use client';

/* * */

import type { Line, Route } from '@carrismetropolitana/api-types/network';

import { ServiceMetrics } from '@/types/metrics.types';
import { Routes } from '@/utils/routes';
import { createContext, useContext } from 'react';
import useSWR from 'swr';

/* * */

interface LinesContextState {
	actions: {
		getLineDataById: (lineId: string) => Line | undefined
		getRouteDataById: (routeId: string) => Route | undefined
		getServiceMetricsByLineId: (lineId: string) => ServiceMetrics[] | undefined
	}
	data: {
		lines: Line[]
		routes: Route[]
		service_metrics: ServiceMetrics[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const LinesContext = createContext<LinesContextState | undefined>(undefined);

export function useLinesContext() {
	const context = useContext(LinesContext);
	if (!context) {
		throw new Error('useLinesContext must be used within a LinesContextProvider');
	}
	return context;
}

/* * */

export const LinesContextProvider = ({ children }) => {
	//

	//
	// A. Fetch data

	const { data: allLinesData, isLoading: allLinesLoading } = useSWR<Line[], Error>(`${Routes.API}/lines`);
	const { data: allRoutesData, isLoading: allRoutesLoading } = useSWR<Route[], Error>(`${Routes.API}/routes`);
	const { data: allServiceMetricsData } = useSWR<ServiceMetrics[], Error>(`${Routes.API}/metrics/service/all`);

	//
	// B. Handle actions

	const getLineDataById = (lineId: string) => {
		return allLinesData?.find(line => line.id === lineId);
	};

	const getRouteDataById = (routeId: string) => {
		return allRoutesData?.find(route => route.id === routeId);
	};

	const getServiceMetricsByLineId = (lineId: string) => {
		return allServiceMetricsData?.filter(serviceMetrics => serviceMetrics.lineId === lineId);
	};

	//
	// C. Define context value

	const contextValue: LinesContextState = {
		actions: {
			getLineDataById,
			getRouteDataById,
			getServiceMetricsByLineId,
		},
		data: {
			lines: allLinesData || [],
			routes: allRoutesData || [],
			service_metrics: allServiceMetricsData || [],
		},
		flags: {
			is_loading: allLinesLoading || allRoutesLoading,
		},
	};

	//
	// D. Render components

	return (
		<LinesContext.Provider value={contextValue}>
			{children}
		</LinesContext.Provider>
	);

	//
};
