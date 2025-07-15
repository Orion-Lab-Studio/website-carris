import React from 'react';

import styles from './styles.module.css';
import { PressHeaderGenericSection } from '../PressHeaderGenericSection';
import { useTranslations } from 'next-intl';
import { PressNotesContentSection } from '../PressNotesContentSection';
import { BreakpointDesktop } from '../../responsive/BreakpointSwitch';

export function PressNotesPage() {
    const t = useTranslations('home.PressNotesBase');

	return (
		<div className={styles.container}>
        <BreakpointDesktop>
            <PressHeaderGenericSection title={t('section_heading')} />
        </BreakpointDesktop>
        <PressNotesContentSection />
		</div>
	);
}
