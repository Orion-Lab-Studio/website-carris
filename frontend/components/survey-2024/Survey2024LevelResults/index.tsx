'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Review2024CardGroup } from '@/components/review-2024/Review2024CardGroup';
import { Accordion } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { Survey2024ResultsToolbar } from '../Survey2024ResultsToolbar';
import styles from './styles.module.css';

/* * */

export function Survey2024LevelResults() {
	//

	//
	// A. Setup variables

	const t = useTranslations('survey-2024.Survey2024ResultsCard');

	//
	// B. Render components

	return (
		<div id="results">
			<Surface forceOverflow>
				<Accordion>
					<Accordion.Item value="results">
						<Accordion.Control>
							<h2 className={styles.heading}>{t('heading')}</h2>
						</Accordion.Control>
						<Accordion.Panel>
							<Survey2024ResultsToolbar />
							{/* <Grid columns="abc" withGap>
									<Review2024CardGroup groupId="results_rede" />
									<Review2024CardGroup groupId="results_stops" />
									<Review2024CardGroup groupId="results_bus" />
									<Review2024CardGroup groupId="results_bus" />
								</Grid> */}

						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			</Surface>
		</div>
	);

	//
}
