/* * */

import BlackHeader from '@/components/BlackHeader/BlackHeader';
import Image from 'next/image';

import styles from './styles.module.css';

/* * */

import PlannerCalloutImage from '@/assets/home/planner-callout.png';

/* * */

export function PlannerCallout() {
	return (
		<div className={styles.container}>
			<BlackHeader text="Planeador de Viagem" />
			<a href="https://carrismetropolitana.pt/planner" rel="noopener noreferrer" target="_blank">
				<Image alt="Logotipo Carris Metropolitana próxima das escolas" height={900} src={PlannerCalloutImage} style={{ height: '100%', width: '100%' }} width={670} />
			</a>
		</div>
	);
};
