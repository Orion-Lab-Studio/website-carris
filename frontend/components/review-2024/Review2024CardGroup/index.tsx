/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	children: React.ReactNode
}

/* * */

export function Review2024CardGroup({ children }: Props) {
	return (
		<div className={styles.container}>
			{children}
		</div>
	);
}
