'use client';

/* * */

import type { SimplifiedAlert } from '@/types/alerts.types';
import type { DemandMetrics } from '@/types/metrics.types';
import type { Line, Pattern, Route, Shape, Waypoint } from '@carrismetropolitana/api-types/network';

import { useAlertsContext } from '@/contexts/Alerts.context';
import { useLinesContext } from '@/contexts/Lines.context';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { ServiceMetrics } from '@/types/metrics.types';
import { Routes } from '@/utils/routes';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

/* * */

interface LinesDetailContextState {
	actions: {
		setActivePattern: (patternGroupId: string) => void
		setActiveWaypoint: (stopId: string, stopSequence: number,) => void
	}
	data: {
		active_alerts: null | SimplifiedAlert[]
		active_pattern: null | Pattern
		active_shape: null | Shape
		active_waypoint: null | Waypoint
		all_patterns: null | Pattern[][]
		all_routes: Route[] | undefined
		demand: DemandMetrics | null
		line: Line | null
		service: ServiceMetrics[] | undefined
		valid_patterns: null | Pattern[]
	}
	filters: {
		active_pattern_id: null | string
		active_waypoint_stop_id: null | string
		active_waypoint_stop_sequence: null | string
	}
	flags: {
		is_favorite: boolean
		is_interactive_mode: boolean
		is_loading: boolean
	}
}

/* * */

const LinesDetailContext = createContext<LinesDetailContextState | undefined>(undefined);

export function useLinesDetailContext() {
	const context = useContext(LinesDetailContext);
	if (!context) {
		throw new Error('useLinesDetailContext must be used within a LinesDetailContextProvider');
	}
	return context;
}

/* * */

export const LinesDetailContextProvider = ({ children, lineId }) => {
	//

	//
	// A. Setup variables

	const linesContext = useLinesContext();
	const stopsContext = useStopsContext();
	const alertsContext = useAlertsContext();
	const profileContext = useProfileContext();
	const operationalDayContext = useOperationalDayContext();

	const [dataAllPatternsState, setDataAllPatternsState] = useState<LinesDetailContextState['data']['all_patterns']>(null);
	const [dataValidPatternsState, setDataValidPatternsState] = useState<LinesDetailContextState['data']['valid_patterns']>(null);
	const [dataDemandState, setDataDemandState] = useState<LinesDetailContextState['data']['demand']>(null);
	const [dataActiveAlertsState, setDataActiveAlertsState] = useState<LinesDetailContextState['data']['active_alerts']>(null);
	const [dataActivePatternState, setDataActivePatternState] = useState<LinesDetailContextState['data']['active_pattern']>(null);
	const [dataActiveShapeState, setDataActiveShapeState] = useState<LinesDetailContextState['data']['active_shape']>(null);
	const [dataServiceMetricsState, setDataServiceMetricsState] = useState<LinesDetailContextState['data']['service']>();
	const [dataActiveWaypointState, setDataActiveWaypointState] = useState<LinesDetailContextState['data']['active_waypoint']>(null);

	const [flagIsFavoriteState, setFlagIsFavoriteState] = useState<LinesDetailContextState['flags']['is_favorite']>(false);
	const [flagIsInteractiveModeState, setFlagIsInteractiveModeState] = useState<LinesDetailContextState['flags']['is_interactive_mode']>(false);

	const [filterActivePatternIdState, setFilterActivePatternIdState] = useQueryState('active_pattern_id');
	const [filterActiveWaypointStopIdState, setFilterActiveWaypointStopIdState] = useQueryState('active_waypoint_stop_id');
	const [filterActiveWaypointStopSequenceState, setFilterActiveWaypointStopSequenceState] = useQueryState('active_waypoint_stop_sequence');

	//
	// B. Fetch data

	const { data: allDemandByLineData } = useSWR<DemandMetrics[], Error>(`${Routes.API}/metrics/demand/by_line`);

	const dataLineState = useMemo<Line | undefined>(() => {
		const lineData = linesContext.actions.getLineDataById(lineId);
		const serviceMetrics = linesContext.actions.getServiceMetricsByLineId(lineId);
		setDataServiceMetricsState(serviceMetrics);
		if (!lineData) return;
		else return lineData;
	}, [lineId, linesContext.data.lines, linesContext.data.service_metrics]);

	const dataRoutesState = useMemo<Route[] | undefined>(() => {
		if (!dataLineState) return;
		const lineRoutesData: Route[] = [];
		dataLineState.route_ids.forEach((routeId) => {
			const routeData = linesContext.actions.getRouteDataById(routeId);
			if (!routeData) return;
			lineRoutesData.push(routeData);
		});
		return lineRoutesData;
	}, [dataLineState, linesContext.data.routes]);

	useEffect(() => {
		(async () => {
			try {
				if (!dataLineState) return;
				const fetchPromises = dataLineState.pattern_ids.map((patternId) => {
					return fetch(`${Routes.API}/patterns/${patternId}`)
						.then(response => response.json())
						.then((patternData) => {
							return patternData.map((patternGroup) => {
								patternGroup.path = patternGroup.path.map((waypoint) => {
									const stopData = stopsContext.actions.getStopById(waypoint.stop_id);
									if (!stopData) return waypoint;
									return { ...waypoint, stop: stopData };
								});
								return patternGroup;
							});
						});
				});
				const resultData = await Promise.all(fetchPromises);
				setDataAllPatternsState(resultData);
			}
			catch (error) {
				console.error('Error fetching pattern data:', error);
			}
		})();
	}, [dataLineState, stopsContext.data.stops]);

	/**
	 * TASK: Fetch shape data for the active trip.
	 * WHEN: The `dataActivePatternState` changes.
	 */
	useEffect(() => {
		if (!dataActivePatternState) return;
		(async () => {
			try {
				const shapeData = await fetch(`${Routes.API}/shapes/${dataActivePatternState.shape_id}`).then((response) => {
					if (!response.ok) console.log(`Failed to fetch shape data for shapeId: ${dataActivePatternState.shape_id}`);
					else return response.json();
				});
				if (shapeData) {
					shapeData.geojson = {
						...shapeData.geojson,
						properties: {
							color: dataActivePatternState.color,
							text_color: dataActivePatternState.text_color,
						},
					};
				}
				setDataActiveShapeState(shapeData);
			}
			catch (error) {
				console.error('Error fetching shape data:', error);
			}
		})();
	}, [dataActivePatternState]);

	//
	// C. Transform data

	useEffect(() => {
		setFlagIsFavoriteState(profileContext.data.favorite_lines?.includes(lineId) ? true : false);
	}, [profileContext.data.favorite_lines, lineId]);

	useEffect(() => {
		if (!dataAllPatternsState || !operationalDayContext.data.selected_day) return;
		const activePatterns: Pattern[] = [];
		for (const pattern of dataAllPatternsState) {
			for (const patternGroup of pattern) {
				const selected_date = operationalDayContext.data.selected_day;
				if (!selected_date) return;

				// Find the closest valid date
				const closest_date = patternGroup.valid_on.reduce((acc, curr) => {
					if (selected_date <= curr && (acc === '' || curr < acc)) return curr;

					return acc;
				}, '');

				// If the closest date is valid, add the pattern group to the list
				if (closest_date != '' && !activePatterns.find(activePattern => activePattern.id === patternGroup.id)) {
					activePatterns.push(patternGroup);
				}
			}
		}
		setDataValidPatternsState(activePatterns);
		if (!dataActivePatternState && activePatterns[0]) {
			setDataActivePatternState(activePatterns[0]);
		}
	}, [dataAllPatternsState, operationalDayContext.data.selected_day]);

	useEffect(() => {
		if (!alertsContext.data.simplified) return;
		const activeAlerts = alertsContext.data.simplified.filter((simplifiedAlertData) => {
			return simplifiedAlertData.informed_entity.some((informedEntity) => {
				// Skip if no routeId and no stopId in line
				if (!informedEntity.routeId && !informedEntity.stopId) return false;
				// Check if the alert is active and has a matching route
				const hasMatchingRoute = dataLineState?.route_ids.includes(informedEntity.routeId || '');
				const isActive = simplifiedAlertData.end_date ? simplifiedAlertData.end_date >= new Date() : true;
				return hasMatchingRoute && isActive;
			});
		});
		setDataActiveAlertsState(activeAlerts);
	}, [alertsContext.data.simplified, lineId]);

	useEffect(() => {
		if (!allDemandByLineData) return;
		const demandForCurrentLine = allDemandByLineData.find(demandByLineItem => demandByLineItem.item_id === dataLineState?.id);
		setDataDemandState(demandForCurrentLine || null);
	}, [allDemandByLineData, lineId]);

	//
	// D. Handle actions

	const setActivePattern = (patternVersionId: string) => {
		for (const patternGroup of dataValidPatternsState || []) {
			if (patternGroup.version_id === patternVersionId) {
				setDataActivePatternState(patternGroup);
				setFilterActivePatternIdState(patternGroup.id);
				setFlagIsInteractiveModeState(false);
				return;
			}
		}
		setDataActivePatternState(null);
	};

	const setActiveWaypoint = (stopId: string, stopSequence: number) => {
		// Return early if active waypoint is already selected
		if (dataActiveWaypointState?.stop_id === stopId && dataActiveWaypointState?.stop_sequence === stopSequence) return;
		// Find the waypoint in the active pattern that matches the stop id and stop sequence
		const foundWaypoint = dataActivePatternState?.path.find(waypoint => waypoint.stop_id === stopId && waypoint.stop_sequence === stopSequence);
		if (!foundWaypoint) return;
		// Update the state
		setDataActiveWaypointState(foundWaypoint);
		setFilterActiveWaypointStopIdState(stopId);
		setFilterActiveWaypointStopSequenceState(String(stopSequence));
		setFlagIsInteractiveModeState(true);
	};

	//
	// E. Handle Filters State

	// REFACTOR HERE
	// O programa deve conseguir identificar o pattern ativo a partir do ID do pattern ativo da query string.
	// Provavelmente vai ser necessário combinar os dois useEffects abaixo num só.
	// É necessário passar as entidades ativas (pattern, stop, sequence, etc.) para a query string;
	// e, vice-versa, é necessário passar as entidades da query string para o estado.

	useEffect(() => {
		if (filterActivePatternIdState) {
			for (const patternGroup of dataValidPatternsState || []) {
				if (patternGroup.id === filterActivePatternIdState) {
					setDataActivePatternState(patternGroup);
					return;
				}
			}
		}
	}, [dataValidPatternsState]);

	useEffect(() => {
		// Pre-select the first stop if no stop is selected. Return otherwise.
		if (!dataActivePatternState) return;
		// Sort stops by sequence
		const sortedStops = dataActivePatternState.path.sort((a, b) => a.stop_sequence - b.stop_sequence);
		if (sortedStops[0]) {
			setDataActiveWaypointState(sortedStops[0]);
		}
	}, [dataActivePatternState, dataValidPatternsState]);

	//
	// F. Define context value

	const contextValue: LinesDetailContextState = {
		actions: {
			setActivePattern,
			setActiveWaypoint,
		},
		data: {
			active_alerts: dataActiveAlertsState,
			active_pattern: dataActivePatternState,
			active_shape: dataActiveShapeState,
			active_waypoint: dataActiveWaypointState,
			all_patterns: dataAllPatternsState,
			all_routes: dataRoutesState,
			demand: dataDemandState,
			line: dataLineState || null,
			service: dataServiceMetricsState,
			valid_patterns: dataValidPatternsState,
		},
		filters: {
			active_pattern_id: filterActivePatternIdState,
			active_waypoint_stop_id: filterActiveWaypointStopIdState,
			active_waypoint_stop_sequence: filterActiveWaypointStopSequenceState,
		},
		flags: {
			is_favorite: flagIsFavoriteState,
			is_interactive_mode: flagIsInteractiveModeState,
			is_loading: linesContext.flags.is_loading || stopsContext.flags.is_loading || dataRoutesState === null || dataAllPatternsState === null,
		},
	};

	//
	// F. Render components

	return (
		<LinesDetailContext.Provider value={contextValue}>
			{children}
		</LinesDetailContext.Provider>
	);

	//
};
