'use client';

/* * */

import { type GeneralStatusMessage } from '@carrismetropolitana/website-shared-types';

import styles from './styles.module.css';

/* * */

interface Props {
	message: GeneralStatusMessage
}

/* * */

export function GeneralStatusMessage({ message }: Props) {
	return (
		<div className={styles.container} data-severity={message.severity}>
			<h1 className={styles.heading}>Lorem ipsum dolor sit amet</h1>
		</div>
	);
}
