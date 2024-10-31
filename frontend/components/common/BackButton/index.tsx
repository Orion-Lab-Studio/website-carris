'use client';

/* * */

import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	href?: string
}

/* * */

export function BackButton({ href }: Props) {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const t = useTranslations('common.BackButton');

	//
	// B. Handle actions

	const handleBackButtonClick = () => {
		router.back();
	};

	//
	// C. Render components

	if (href) {
		return (
			<Link className={styles.container} href={href}>
				<IconArrowLeft size={14} />
				<span className={styles.label}>{t('label')}</span>
			</Link>
		);
	}

	return (
		<div className={styles.container} onClick={handleBackButtonClick}>
			<IconArrowLeft size={14} />
			<span className={styles.label}>{t('label')}</span>
		</div>
	);

	//
}
