/* * */

import { Accordion, AccordionControl, Text } from '@mantine/core';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function SurveyResultsInfoAccordion() {
	//

	//
	// A. Setup Variables
	const t = useTranslations('survey.SurveyResultsInfoAccordion');
	//
	// B. Render Components
	return (
		<Accordion style={{ borderBottom: '1px solid #e9e9e9', margin: '0 auto', width: '100%' }}>
			<Accordion.Item value="InfoResults">
				<AccordionControl className={styles.control} icon={<IconInfoCircleFilled />}><Text className={styles.control}>{t('heading')}</Text></AccordionControl>
				<Accordion.Panel>
					<div className={styles.desc1}>
						<Text>
							{t('description1')}
						</Text>
					</div>
					<div className={styles.desc2}>
						<Text>
							{t('description2')}
						</Text>
					</div>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);

	//
}
