/* * */

import type { Line } from '@carrismetropolitana/api-types/network';

import { IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface Props {
	lineData?: Line
	longName?: string
	size?: 'lg' | 'md'
}

/* * */

export function LineName({ lineData, longName, size = 'md' }: Props) {
	//
	// A. Handles actions

	//
	return (
		<div className={`${styles.name} ${styles[size]}`}>
			<p>
				{lineData?.long_name || longName || '• • •'}
			</p>
		</div>
	);
}
