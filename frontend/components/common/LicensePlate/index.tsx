/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	country?: string
	value: string
}

/* * */

export function LicensePlate({ country = 'pt', value }: Props) {
	return (
		<div className={styles.container}>
			<span className={styles.country}>
				{country}
			</span>
			<span className={styles.plate}>
				{value}
			</span>
		</div>
	);
}
