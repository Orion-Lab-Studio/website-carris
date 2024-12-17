/* * */

import type { Timetable } from '@/types/timetables.types';
import type { Minute } from '@/types/timetables.types';

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';

/* * */

interface TimetableSchedulesProps {
	selectedExceptionIds: string[]
	setSelectedExceptionIds: (values: string[]) => void
	timetableData: Timetable
}

/* * */

export default function TimetableSchedules({ selectedExceptionIds, setSelectedExceptionIds, timetableData }: TimetableSchedulesProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.TimetableSchedules');
	const linesDetailContext = useLinesDetailContext();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.column}>
				<p className={styles.hour}>{t('hours')}</p>
				<p className={styles.minute}>{t('minutes')}</p>
			</div>
			{timetableData.hours.map(hourData => (
				<div key={hourData.hour_value} className={styles.column}>
					<p className={styles.hour}>{hourData.hour_label}</p>
					{hourData.minutes.map(minuteData => (
						<TimetableSchedulesMinute
							key={minuteData.minute_value}
							minuteData={minuteData}
							selectedExceptionIds={selectedExceptionIds}
							setSelectedExceptionIds={setSelectedExceptionIds}
							isHighlighted={Boolean(linesDetailContext.data.highlighted_trip_ids && minuteData.trip_ids.some(tripId => linesDetailContext.data.highlighted_trip_ids?.includes(tripId)))}
							onClick={() => linesDetailContext.actions.setHighlightedTripIds(minuteData.trip_ids)}
						/>
					))}
				</div>
			))}
		</div>
	);

	//
}

/* * */

interface TimetableSchedulesMinuteProps {
	minuteData: Minute
	selectedExceptionIds: string[]
	setSelectedExceptionIds: (values: string[]) => void
	isHighlighted: boolean
	onClick?: () => void
}

/* * */

function TimetableSchedulesMinute({ minuteData, selectedExceptionIds, setSelectedExceptionIds, isHighlighted, onClick }: TimetableSchedulesMinuteProps) {
	//

	//
	// A. Transform data

	const isSelected = selectedExceptionIds.some(exceptionId => minuteData.exception_ids.includes(exceptionId));

	//
	// B. Handle actions

	const handleMouseOverException = () => {
		setSelectedExceptionIds(minuteData.exception_ids);
	};

	const handleMouseOutException = () => {
		setSelectedExceptionIds([]);
	};

	//
	// C. Render components

	return (
		<p
			key={minuteData.minute_value}
			className={`${styles.minute} ${minuteData.exception_ids.length > 0 && styles.withException} ${isSelected && styles.isSelected} ${!isSelected && selectedExceptionIds.length > 0 && styles.isOthersSelected} ${isHighlighted && styles.isHighlighted}`}
			onMouseOut={handleMouseOutException}
			onMouseOver={handleMouseOverException}
			onClick={onClick}
		>
			{minuteData.minute_label}
			{minuteData.exception_ids.length > 0 && minuteData.exception_ids.map(exceptionId => (
				<span key={exceptionId} className={styles.exception}>
					{exceptionId}
				</span>
			))}
		</p>
	);

	//
}
