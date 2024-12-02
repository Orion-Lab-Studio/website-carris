// 'use client';

/* * */

import { ThemeSwitch } from '@/components/responsive/ThemeSwitch';
import { BrandsCmet } from '@/settings/assets.settings';
import { Image } from '@mantine/core';
// import Lottie from 'lottie-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

// import xmasDarkAnimation from '@/assets/animations/header/xmas/xmas-dark.json';
// import xmasLightAnimation from '@/assets/animations/header/xmas/xmas-light.json';

/* * */

// export function Logo() {
// 	return (
// 		<Link className={styles.container} href="/">
// 			<ThemeSwitch
// 				dark={<Lottie animationData={xmasDarkAnimation} style={{ height: 70, width: 150 }} />}
// 				light={<Lottie animationData={xmasLightAnimation} style={{ height: 70, width: 150 }} />}
// 			/>
// 		</Link>
// 	);
// }

/* * */

export function Logo() {
	return (
		<Link className={styles.container} href="/">
			<ThemeSwitch
				dark={<Image alt="Carris Metropolitana" src={BrandsCmet.cmet_dark} style={{ height: 40, width: 150 }} />}
				light={<Image alt="Carris Metropolitana" src={BrandsCmet.cmet_light} style={{ height: 40, width: 150 }} />}
			/>
		</Link>
	);
}
