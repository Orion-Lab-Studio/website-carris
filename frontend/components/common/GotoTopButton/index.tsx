'use client';
/* * */

import { Button } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';
import React from 'react';

import styles from './styles.module.css';

/* * */
export function GotoTopButton() {
	//

	//
	// A. Handle Actions

	const gotoTop = (e) => {
		e.preventDefault();
		console.log('Here I go!');
	};

	//
	// B. Render Components

	return (
		<div className={styles.buttonWrapper}>
			<Button className={styles.button} onClick={e => gotoTop(e)}><IconArrowUp size={20} /></Button>
		</div>
	);

	//
}
