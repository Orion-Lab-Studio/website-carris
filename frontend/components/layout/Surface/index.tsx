/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	children?: React.ReactNode
	forceOverflow?: boolean
	variant?: 'alerts' | 'brand' | 'brand2' | 'default' | 'muted' | 'persistent' | 'standout' | 'success' | 'warning'
}

/* * */

export function Surface({ children, forceOverflow, variant = 'default' }: Props) {
	//

	if (variant === 'standout') {
		return (
			<div className={`${styles.container} ${styles[variant]} ${forceOverflow && styles.forceOverflow}`}>
				<div className={styles.inner}>
					{children}
				</div>
			</div>
		);
	}

	if (variant === 'alerts') {
		return (
			<div className={`${styles.container} ${styles[variant]} ${forceOverflow && styles.forceOverflow}`}>
				{children}
			</div>
		);
	}

	return (
		<div className={`${styles.container} ${styles[variant]} ${forceOverflow && styles.forceOverflow}`}>
			{children}
		</div>
	);

	//
}
