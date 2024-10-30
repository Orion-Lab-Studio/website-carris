/* * */

import type { Line } from '@carrismetropolitana/api-types/network';

import { IconInfoTriangleFilled } from '@tabler/icons-react';
import classNames from 'classnames/bind';

import styles from './styles.module.css';

/* * */

interface Props {
	color?: string
	lineData?: Line
	onClick?: () => void
	shortName?: string
	size?: 'lg' | 'md'
	textColor?: string
	withAlertIcon?: boolean
}

/* * */

const cx = classNames.bind(styles);

/* * */

export function LineBadge({ color = '#000', lineData, onClick, shortName = '• • •', size = 'md', textColor = '#fff', withAlertIcon = false }: Props) {
	return (
		<div
			className={cx({ badge: true, clickable: !!onClick, lg: size === 'lg', md: size === 'md' })}
			onClick={onClick}
			style={{ backgroundColor: lineData?.color || color, color: lineData?.text_color || textColor }}
		>
			{lineData?.short_name || shortName}
			{withAlertIcon && (
				<div className={styles.alertIcon}>
					<IconInfoTriangleFilled size={12} />
				</div>
			)}
		</div>
	);
}
