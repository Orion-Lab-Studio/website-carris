import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useAlertsContext } from '@/contexts/Alerts.context';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { useProfileContext } from '@/contexts/Profile.context';
import toast from '@/utils/toast';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { AlertsCarousel } from '@/components/common/AlertsCarousel';
import { FavoriteToggle } from '@/components/common/FavoriteToggle';
import { RegularListItem } from '@/components/layout/RegularListItem';
import { LineBadge } from '@/components/lines/LineBadge';
import { LineName } from '@/components/lines/LineName';
import { Tooltip } from '@mantine/core';
import { IconInfoTriangle } from '@tabler/icons-react';
import styles from './styles.module.css';

/* * */

// IDs das linhas que servem as praias da Arrábida, conforme ArrabidaWay
const ARRABIDA_LINE_IDS = [
	'4474',
	'4414',
	'4415',
	'4471',
	'4414',
	'4477',
	'4470'
];

export function ArrabidaList() {
	//
	// A. Setup variables

	const linesListContext = useLinesListContext();
	const profileContext = useProfileContext();
	const alertsContext = useAlertsContext();
	const t = useTranslations('arrabida.ArrabidaList');

	const stableItems = useMemo(() => {
		const linesMap = new Map(linesListContext.data.filtered.map(l => [l.id, l]));
			return ARRABIDA_LINE_IDS
				.map(id => linesMap.get(id))
				.filter(Boolean);
	}, [linesListContext.data.filtered]);

	//
	// B. Handle actions

	const handleToggleFavorite = async (lineId: string, lineName: string) => {
		try {
			const wasFavorite = profileContext.data.favorite_lines?.includes(lineId) || false;
			await profileContext.actions.toggleFavoriteLine(lineId);

			if (wasFavorite) {
				toast.success({ message: t('favorite_removed') + `: ${lineName}` });
			}
			else {
				toast.success({ message: t('favorite_added') + `: ${lineName}` });
			}
		}
		catch (error) {
			console.error('Erro ao alterar favorito:', error);
			toast.error({ message: 'Ocorreu um erro ao alterar os favoritos' });
		}
	};

	//
	// C. Render components

	if (!stableItems.length) {
		return (
			<div id="lines">
				<Surface variant="persistent" forceOverflow>
					<Section heading={t('title')} subheading={t('subtitle')} withPadding withGap>
						<NoDataLabel text={t('no_data', { defaultValue: 'Sem dados disponíveis' })} withMinHeight />
					</Section>
				</Surface>
			</div>
		);
	}

	return (
		<div id="lines" className={styles.arrabidaListContainer}>
			<Surface variant="persistent" forceOverflow>
				<Section heading={t('title')} subheading={t('subtitle')} withPadding withGap>
					<ul className={styles.listContainer} style={{width: '100%', height: '100%'}}>
						{stableItems.map((item, index, array) => {
							const isFavorite = profileContext.data.favorite_lines?.includes(item.id) || false;
							const alerts = alertsContext.actions.getSimplifiedAlertsByLineId(item.id);
							const hasAlert = alerts.length > 0;
							const isLastItem = index === array.length - 1;

							return (
								<li key={item.id} className={`${styles.listItemWrapper} ${isLastItem ? styles.lastItem : ''}`}>
									<RegularListItem href={`/lines/${item.id}`} style={{width: '100%', height: '100%'}}>
								
										<div className={styles.itemContainer}>
											<div className={styles.lineInfo} style={{flex: 1}}>
												<LineBadge
													lineData={item}
													size="md"
												/>
												<LineName lineData={item} />
											</div>
											<div className={styles.actions} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
												{hasAlert && (
													<Tooltip
														label={t('has_alerts')}
														position="top"
														withArrow
													>
														<div className={styles.alertIcon}>
															<IconInfoTriangle size={20} />
														</div>
													</Tooltip>
												)}
												<Tooltip
													label={t('toggle_favorite')}
													position="top"
													withArrow
												>
													<div 
														onMouseDown={(event) => {
															event.preventDefault();
															event.stopPropagation();
														}}
														onClick={(event) => {
															event.preventDefault();
															event.stopPropagation();
														}}
													>
														<FavoriteToggle
															color={item.color}
															isActive={isFavorite}
															onToggle={() => {
																handleToggleFavorite(item.id, item.long_name);
															}}
														/>
													</div>
												</Tooltip>
											</div>
										</div>
									</RegularListItem>

									{hasAlert && (
										<div className={styles.alertsContainer}>
											<AlertsCarousel alerts={alerts} />
										</div>
									)}
								</li>
							);
						})}
					</ul>
				</Section>
			</Surface>
		</div>
	);
}

export default ArrabidaList;
