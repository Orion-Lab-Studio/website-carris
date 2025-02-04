'use client';

/* * */

import { BackButton } from '@/components/common/BackButton';
import { FavoriteToggle } from '@/components/common/FavoriteToggle';
import { SelectOperationalDay } from '@/components/common/SelectOperationalDay';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { LineBadge } from '@/components/lines/LineBadge';
import { SelectActivePatternGroup } from '@/components/lines/SelectActivePatternGroup';
// import { SelectActivePatternGroupExplainer } from '@/components/lines/SelectActivePatternGroupExplainer';
import { LineDebugDetail } from '@/components/lines/LineDebugDetail';
import { useDebugContext } from '@/contexts/Debug.context';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { useStickyObserver } from '@/hooks/useStickyObserver';
import { getCssVariableValue } from '@/utils/getCssVariableValue';
import toast from '@/utils/toast';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function LinesDetailHeader() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.LinesDetail');
	const profileContext = useProfileContext();
	const linesDetailContext = useLinesDetailContext();
	const debugContext = useDebugContext();
	const operationalDayContext = useOperationalDayContext();

	const headerHeight = getCssVariableValue('--size-height-header');
	const { isSticky, ref: stickyElementRef } = useStickyObserver({ top: headerHeight }, [1], { top: -1 });
	const totalStops = linesDetailContext.data.active_waypoint?.stop_sequence;

	//
	// B. Handle actions

	const handleToggleFavorite = async () => {
		if (!linesDetailContext.data.line) return;
		try {
			await profileContext.actions.toggleFavoriteLine(linesDetailContext.data.line.id);
		}
		catch (error) {
			toast.error({ message: t('toggle_favorite_error', { error: error.message }) });
		}
	};

	//
	// C. Render components

	if (!linesDetailContext.data.line) {
		return null;
	}

	return (
		<>
			<Surface>

				<Section withBottomDivider withPadding>
					<BackButton href="/lines" />
				</Section>

				<Section withBottomDivider withPadding>
					<div className={styles.headingSection}>
						<div className={styles.headingSectionRow}>
							<LineBadge lineData={linesDetailContext.data.line} size="lg" />
							<FavoriteToggle color={linesDetailContext.data.line.color} isActive={linesDetailContext.flags.is_favorite} onToggle={handleToggleFavorite} />
						</div>
						<div className={styles.lineName}>
							{linesDetailContext.data.line.long_name}
						</div>
					</div>
				</Section>

				<Section withPadding>
					{/* <div className={styles.patternSelectorExplainerWrapper}>
						<SelectActivePatternGroupExplainer />
					</div> */}

					{!isSticky && (
						<div className={styles.headerWrapoer}>
							<div className={styles.operationalDaySelectorWrapper}>
								<SelectOperationalDay />
							</div>
							<div className={styles.patternSelectorWrapper}>
								<SelectActivePatternGroup />
							</div>
						</div>
					)}

				</Section>

			</Surface>

			<div ref={stickyElementRef} className={`${styles.containerSummary} ${isSticky ? styles.isSticky : ''}`}>

				{isSticky && (
					<>
						<p className={styles.linesSummaryWrapper}>
							{t.rich('summary', {
								changeDay: chunks => <a className={styles.changeDay} href="#">{chunks}</a>,
								day_name: operationalDayContext.data.selected_day_jsdate,
								dayName: chunks => <span className={styles.dayName}>{chunks}</span>,
								destination_name: linesDetailContext.data.active_pattern?.headsign,
								destinationName: chunks => <span className={styles.destinationName}>{chunks}</span>,
							})}
						</p>
					</>
				)}

			</div>

			{debugContext.flags.is_debug_mode && (
				<Surface variant="debug">
					<Section withPadding>
						<LineDebugDetail
							activePattern={linesDetailContext.data.active_pattern}
							lineColor={linesDetailContext.data.line.color}
							totalStops={totalStops}
						/>
					</Section>
				</Surface>
			)}

		</>
	);

	//
}
