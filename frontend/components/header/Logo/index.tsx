'use client';

/* * */

import { LottiePlayer } from '@/components/common/LottiePlayer';
import { ThemeSwitch } from '@/components/responsive/ThemeSwitch';
// import { BrandsCmet } from '@/settings/assets.settings';
// import { Image } from '@mantine/core';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function Logo() {
	return (
		<Link className={styles.container} href="/">
			<ThemeSwitch
				dark={<LottiePlayer path="/assets/header/mascot/mascot-dark.json" style={{ height: 70, width: 150 }} loop play />}
				light={<LottiePlayer path="/assets/header/mascot/mascot-light.json" style={{ height: 70, width: 150 }} loop play />}
			/>
		</Link>
	);
}

/* * */

// export function Logo() {
// 	return (
// 		<Link className={styles.container} href="/">
// 			<ThemeSwitch
// 				dark={<Image alt="Carris Metropolitana" src={BrandsCmet.cmet_dark} style={{ height: 40, width: 150 }} />}
// 				light={<Image alt="Carris Metropolitana" src={BrandsCmet.cmet_light} style={{ height: 40, width: 150 }} />}
// 			/>
// 		</Link>
// 	);
// }
