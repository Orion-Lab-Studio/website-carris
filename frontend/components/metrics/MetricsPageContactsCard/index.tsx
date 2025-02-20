'use client';

/* * */

import { ContactMetrics2024CardSchema } from '@/components/metrics/MetricsPageContacts/_data/cards';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	cardData: ContactMetrics2024CardSchema
	isFirstChild?: boolean
	isLastChild?: boolean
}

interface CustomCSSProperties extends React.CSSProperties {
	'--color-border'?: string
	'--color-primary': string
	'--color-text': string
}

/* * */

export function MetricsPageContactsCard({ cardData, isFirstChild, isLastChild }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2024.Review2024Card');

	const [isOpen, setIsOpen] = useState(false);
	const [shareCardId, setShareCardId] = useQueryState('card');

	//
	// B. Transform data

	const stylesData: CustomCSSProperties = {
		'--color-border': cardData.colors.border || cardData.colors.primary,
		'--color-primary': cardData.colors.primary,
		'--color-text': cardData.colors.text,
	};
	//
	// C. Handle actions

	useEffect(() => {
		if (!shareCardId) return;
		if (shareCardId === cardData._id) {
			setTimeout(() => {
				const cardElem = document.getElementById(cardData._id);
				if (!cardElem) return;
				window.scroll({ behavior: 'smooth', top: cardElem.offsetTop - 120 });
				setTimeout(() => {
					setIsOpen(true);
					setTimeout(() => {
						setShareCardId(null);
					}, 1000);
				}, 1000);
			}, 1000);
		}
	}, [shareCardId]);

	const handleToggleIsOpen = () => {
		setIsOpen(prev => !prev);
	};

	//
	// D. Render components

	return (
		<div className={styles.container} data-is-first={isFirstChild} data-is-last={isLastChild} data-open={isOpen} data-type={cardData._type} id={cardData._id} style={stylesData}>

			<div className={styles.header} onClick={handleToggleIsOpen}>
				<p className={styles.headerTitle}>{cardData.header.title}</p>
				<p className={styles.headerNumber}>{cardData.header.number}</p>
			</div>

			<div className={styles.content}>
				<div className={styles.innerWrapper}>

					<div className={styles.contentNumber}>
						<p className={styles.contentNumberValue}>{cardData.content.number_value}</p>
						<p className={styles.contentNumberLegend}>{cardData.content.number_legend}</p>
					</div>

					<p className={styles.contentTitle}>{cardData.content?.title}</p>
					<p className={styles.contentDescription} dangerouslySetInnerHTML={{ __html: cardData.content?.description?.replace(/\n/g, '<br />') || '' }} />

					<div className={styles.contentNumber}>
						<p className={styles.contentNumberValue}>{cardData.content.number_value}</p>
						<p className={styles.contentNumberLegend}>{cardData.content.number_legend}</p>
					</div>
				</div>
			</div>

		</div>
	);

	//
}
