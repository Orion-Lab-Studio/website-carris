'use client';

/* * */

import { ConsentPopup } from '@/components/common/ConsentPopup';
import { ScrollToTopButton } from '@/components/common/ScrollToTopButton';
import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';

import styles from './styles.module.css';

/* * */

export function WebsiteViewport({ children }) {
	//

	//
	// A. Setup variables

	const searchParams = new URLSearchParams(window.location.search);

	//
	// B. Render components

	return (
		<div className={styles.container}>
			{searchParams.get('origin') !== 'app' && <Header />}
			{children}
			{searchParams.get('origin') !== 'app' && <Footer />}
			{searchParams.get('origin') !== 'app' && <ConsentPopup />}
			<ScrollToTopButton showAfterHeight={350} />
		</div>
	);

	//
}
