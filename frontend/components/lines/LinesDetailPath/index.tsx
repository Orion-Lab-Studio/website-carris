'use client';

/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { LinesDetailPathList } from '@/components/lines/LinesDetailPathList';
import { LinesDetailPathMap } from '@/components/lines/LinesDetailPathMap';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function LinesDetailPath() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.LinesDetailPath');

	const linesDetailContext = useLinesDetailContext();

	//
	// B. Render components

	if (!linesDetailContext.data.active_pattern) {
		return (
			<Surface>
				<NoDataLabel text={t('no_data')} withMinHeight />
			</Surface>
		);
	}

	return (
		<Surface>
			<Section>
				<div className={styles.container}>
					<LinesDetailPathList />
					<div className={styles.mapWrapper}>
						<LinesDetailPathMap />
					</div>
				</div>
			</Section>
		</Surface>
	);

	//
}
