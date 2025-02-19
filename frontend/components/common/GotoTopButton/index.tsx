'use client';
/* * */

import { Button } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';

interface Props {
	scrollValue: number
}

/* * */
export function GotoTopButton({ scrollValue }: Props) {
	//

	//
	// A. Setup Variables

	const [isVisible, setIsVisible] = useState(false);

	//
	// B. Handle Actions

	const gotoTop = (e) => {
		e.preventDefault();
		window.scrollTo({ behavior: 'smooth', top: 0 });
	};

	const handleScroll = () => {
		if (window.scrollY > scrollValue) {
			setIsVisible(true);
		}
		else {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	//
	// C. Render Components

	return (
		isVisible && (
			<Button className={styles.buttonWrapper} onClick={e => gotoTop(e)}>
				<IconArrowUp size={20} />
			</Button>
		)
	);

	//
}
