/* * */

import type { Waypoint } from '@carrismetropolitana/api-types/network';

import { PathWaypointHeader } from '@/components/lines/PathWaypointHeader';
import { PathWaypointNextArrivals } from '@/components/lines/PathWaypointNextArrivals';
import { PathWaypointSpine } from '@/components/lines/PathWaypointSpine';
import { PathWaypointTimetable } from '@/components/lines/PathWaypointTimetable';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useStopsContext } from '@/contexts/Stops.context';

import styles from './styles.module.css';

/* * */

interface Props {
	arrivals: { type: 'realtime' | 'scheduled', unixTs: number }[]
	id?: string
	isFirstStop?: boolean
	isLastStop?: boolean
	isSelected: boolean
	waypointData: Waypoint
}

/* * */

export function PathWaypoint({ arrivals, id, isFirstStop, isLastStop, isSelected, waypointData }: Props) {
	//

	//
	// A. Setup variables

	const stopsContext = useStopsContext();
	const linesDetailContext = useLinesDetailContext();
	const operationalDayContext = useOperationalDayContext();

	const now = Date.now();

	//
	// B. Transform data

	const nextArrivals = arrivals?.filter(arrival => arrival.unixTs > now) || [];
	const realtimeArrivals = nextArrivals.filter(arrival => arrival.type === 'realtime');
	const scheduledArrivals = nextArrivals.filter(arrival => arrival.type === 'scheduled');

	//
	// C. Handle actions

	const handleToggleStop = (event: React.MouseEvent<HTMLDivElement>) => {
		const stopData = stopsContext.actions.getStopById(waypointData.stop_id);
		if (!stopData) return;
		linesDetailContext.actions.setActiveStop(waypointData.stop_sequence, stopData);
		event.stopPropagation();
	};

	//
	// D. Render components

	if (!stop) {
		return null;
	}

	return (
		<div className={`${styles.container} ${isFirstStop && styles.isFirstStop} ${isLastStop && styles.isLastStop} ${isSelected && styles.isSelected}`} id={id} onClick={handleToggleStop}>
			<PathWaypointSpine
				backgroundColor={linesDetailContext.data.active_pattern_group?.color}
				foregroundColor={linesDetailContext.data.active_pattern_group?.text_color}
				isFirstStop={isFirstStop}
				isLastStop={isLastStop}
				isSelected={isSelected}
				stopId={waypointData.stop_id}
			/>
			<div className={styles.detailsWrapper}>
				<PathWaypointHeader
					isFirstStop={isFirstStop}
					isLastStop={isLastStop}
					isSelected={isSelected}
					waypointData={waypointData}
				/>
				{isSelected && operationalDayContext.flags.is_today_selected && (
					<PathWaypointNextArrivals
						realtimeArrivals={realtimeArrivals}
						scheduledArrivals={scheduledArrivals}
					/>
				)}
				{isSelected && (
					<PathWaypointTimetable />
				)}
			</div>
		</div>
	);

	//
}
