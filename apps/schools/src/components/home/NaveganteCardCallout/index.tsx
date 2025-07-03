/* * */

import BlackHeader from '@/components/BlackHeader/BlackHeader';
import Image from 'next/image';

import styles from './styles.module.css';

/* * */

import NaveganteCardCalloutImage from '@/assets/home/navegante-card-callout.png';

/* * */

export function NaveganteCardCallout() {
	return (
		<div className={styles.caixa}>
			<BlackHeader text="Sobre o navegante®" />
			<a href="https://carrismetropolitana.pt/cards" rel="noopener noreferrer" target="_blank">
				<div className={styles.imageContainer}>
					<div className={styles.imageWrapper}>
						<Image alt="Passe navegante" height={602} src={NaveganteCardCalloutImage} style={{ height: '100%', width: '100%' }} width={852} priority />
					</div>
				</div>
			</a>
		</div>
	);
}
