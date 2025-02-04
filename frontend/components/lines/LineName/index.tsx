/* * */

import type { Line } from '@carrismetropolitana/api-types/network';

import styles from './styles.module.css';

/* * */

interface Props {
	lineData?: Line
	longName?: string
	size?: 'lg' | 'md'
}

/* * */

export function LineName({ lineData, longName, size = 'md' }: Props) {
	return (
		<div className={`${styles.name} ${styles[size]}`}>
			{lineData?.long_name || longName || '• • •'}
		</div>
	);
}
