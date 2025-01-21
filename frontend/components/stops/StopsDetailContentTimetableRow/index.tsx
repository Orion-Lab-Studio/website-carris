/* * */

import { NextArrivals } from '@/components/common/NextArrivals';
import { LineDisplay } from '@/components/lines/LineDisplay';
import { useLocationsContext } from '@/contexts/Locations.context';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';
import { Arrival, ArrivalStatus } from '@/types/stops.types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useCallback, useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	arrivalData: Arrival
	status: ArrivalStatus
}

/* * */

export function StopsDetailContentTimetableRow({ arrivalData, status }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsDetailContentTimetableRow');
	const stopsDetailContext = useStopsDetailContext();
	const locationsContext = useLocationsContext();
	const operationalDayContext = useOperationalDayContext();
	const selectedDay = operationalDayContext.data.selected_day;
	//
	// B. Transform data

	const isSelected = useMemo(() => {
		const isSameTripId = stopsDetailContext.data.active_trip_id === arrivalData.trip_id;
		const isSameStopSequence = stopsDetailContext.data.active_stop_sequence === arrivalData.stop_sequence;
		return isSameTripId && isSameStopSequence;
	}, [stopsDetailContext.data.active_trip_id, stopsDetailContext.data.active_stop_sequence, arrivalData.trip_id, arrivalData.stop_sequence]);

	// This is needed to avoid rerendering the component when the time changes
	const thisPattern = stopsDetailContext.data.valid_pattern_groups?.find(pattern => pattern.id === arrivalData.pattern_id);

	//
	// C. Handle actions

	const handleSelectTrip = useCallback(() => {
		if (isSelected) {
			stopsDetailContext.actions.resetActiveTripId();
			return;
		}
		stopsDetailContext.actions.setActiveTripId(arrivalData.trip_id, arrivalData.stop_sequence);
	}, [arrivalData.trip_id, arrivalData.stop_sequence, stopsDetailContext.actions.setActiveTripId]);

	//
	// D. Render components

	if (!thisPattern) {
		return null;
	}

	return (
		<div className={`${styles.container} ${styles[status]} ${isSelected && styles.isSelected}`} onClick={handleSelectTrip}>

			<div className={styles.summary}>
				<LineDisplay
					color={thisPattern.color}
					longName={thisPattern.headsign}
					shortName={thisPattern.line_id}
					textColor={thisPattern.text_color}
				/>
				<NextArrivals
					arrivals={[arrivalData.estimated_arrival_unix || arrivalData.scheduled_arrival_unix]}
					status={status}
					withIcon={true}
				/>
			</div>

			{isSelected && (
				<div className={styles.details}>
					<div className={styles.linkContainer}>
						<Link href={`/lines/${thisPattern.short_name}?&day=${selectedDay}&active_pattern_id=${thisPattern?.id}`} target="_blank"><p className={styles.link}>Percurso Completo</p></Link>
					</div>
					{thisPattern.locality_ids.length > 0 && (
						<div className={styles.localitiesListWrapper}>
							<p className={styles.localitiesLabel}>{t('localities.label')}</p>
							<p>
								{thisPattern.locality_ids.map((localityId, index) => (
									<span key={index}>
										{index > 0 && <span className={styles.localitySeparator}> • </span>}
										<span className={styles.localityName}>{locationsContext.actions.getLocalityById(localityId)?.name}</span>
									</span>
								))}
							</p>
						</div>
					)}

				</div>
			)}

		</div>
	);
}
