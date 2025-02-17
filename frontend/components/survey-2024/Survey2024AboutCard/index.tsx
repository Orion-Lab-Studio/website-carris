'use client';

/* * */

import { LottiePlayer } from '@/components/common/LottiePlayer';
import { Section } from '@/components/layout/Section';
import { LineBadge } from '@/components/lines/LineBadge';
import { Survery2024AboutCardSchema } from '@/components/survey-2024/_data/About/cards';
import { Button, CopyButton, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconShare2 } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { useEffect, useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	cardData: Survery2024AboutCardSchema
	isFirstChild?: boolean
	isLastChild?: boolean
}
/* * */

export function Survey2024AboutCard({ cardData, isFirstChild, isLastChild }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('review-2024.Review2024Card');

	const [isOpen, setIsOpen] = useState(false);
	const [shareCardId, setShareCardId] = useQueryState('card');

	//
	// B. Transform data
	const shareUrl = useMemo(() => {
		if (typeof window === 'undefined') return;
		return `${window.location.origin}${window.location.pathname}?card=${cardData._id}`;
	}, []);
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
		console.log(cardData._id);
	};

	const handleShareUrl = () => {
		modals.open({
			children: (
				<Section withGap>
					<p>{t('share.message')}</p>
					<p className={styles.urlCopy}>{shareUrl}</p>
					<CopyButton timeout={1500} value={shareUrl || ''}>
						{({ copied, copy }) => (
							<Button onClick={copy} variant="secondary" w="100%">
								{copied ? t('share.copied') : t('share.copy')}
							</Button>
						)}
					</CopyButton>
				</Section>
			),
			title: (
				<p className={styles.urlTitle}>{t('share.title')}</p>
			),
		});
	};

	//
	// D. Render components

	return (
		<div className={styles.container} data-is-first={isFirstChild} data-is-last={isLastChild} data-open={isOpen} id={cardData._id}>

			<div className={styles.header} onClick={handleToggleIsOpen}>
				<p className={styles.headerTitle}>{cardData.header.value}</p>
				<p className={styles.headerNumber}>{cardData.content.legend}</p>
			</div>

			<div className={styles.content}>
				<div className={styles.innerWrapper}>

					{/* {cardData.content.lottie_src && (
						<div className={styles.contentLottie}>
							{isOpen && (
								<LottiePlayer
									path={cardData.content.lottie_src}
									loop
									play
								/>
							)}
						</div>
					)} */}

					<p className={styles.contentTitle}>{cardData.content?.legend}</p>

					<Tooltip label={t('share.tooltip')} withArrow>
						<div className={styles.shareButton} onClick={handleShareUrl}>
							<IconShare2 />
						</div>
					</Tooltip>

				</div>
			</div>

		</div>
	);

	//
}
