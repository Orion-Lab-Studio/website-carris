import React from "react";
import styles from './styles.module.css';
import { PressHeaderGenericSection } from "../PressHeaderGenericSection";
import { PressKnowledgeContentSection } from "../PressKnowledgeContentSection";
import { BreakpointDesktop } from "../../responsive/BreakpointSwitch";
import { useTranslations } from "next-intl";

export function PressKnowledgePage() {
    const t = useTranslations('home.PressKnowledgeBase');

    return (
        <div className={styles.container}>
            <BreakpointDesktop>
                <PressHeaderGenericSection title={t('section_heading')} />
            </BreakpointDesktop>
            <PressKnowledgeContentSection />
        </div>
    )
}