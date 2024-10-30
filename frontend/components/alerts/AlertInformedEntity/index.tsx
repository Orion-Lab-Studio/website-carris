'use client';

/* * */

import type { Line } from '@/types/lines.types';
import type { Stop } from '@/types/stops.types';

import LineBadge from '@/components/lines/LineBadge';
import { useLinesContext } from '@/contexts/Lines.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { useRouter } from '@/i18n/routing';
import { Routes } from '@/utils/routes';
import { useMemo } from 'react';

/* * */

interface Props {
	lineId?: string
	stopId?: string
}

/* * */

export default function Component({ lineId, stopId }: Props) {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const linesContext = useLinesContext();
	const stopsContext = useStopsContext();

	//
	// B. Transform data

	const lineData = useMemo<Line | undefined>(() => {
		return linesContext.data.lines?.find(line => line.id === lineId);
	}, [linesContext.data.lines]);

	const stopData = useMemo<Stop | undefined>(() => {
		return stopsContext.data.stops?.find(stop => stop.id === stopId);
	}, [stopsContext.data.stops]);

	//
	// C. Handle actions

	const handleLineBadgeClick = () => {
		router.push(`${Routes.LINES.route}/${lineId}`);
	};

	//
	// D. Render components

	if (lineId && lineData) {
		return (
			<LineBadge line={lineData} onClick={handleLineBadgeClick} />
		);
	}

	if (stopId && stopData) {
		return (
			<p>{stopData.stop_name}</p>
		);
	}

	//
}
