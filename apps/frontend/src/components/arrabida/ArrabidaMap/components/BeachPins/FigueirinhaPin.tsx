'use client';

/* * */

import { type BeachPinProps } from '../../types';

/* * */

export function FigueirinhaPin({ isActive, zoom = 12 }: BeachPinProps) {
	//

	//
	// A. Setup variables

	const baseSize = 220;
	const zoomFactor = Math.max(0.5, Math.min(2, zoom / 12));
	const size = baseSize * zoomFactor;

	//
	// B. Render components

	return (
		<svg
			height={size}
			viewBox="500 550 400 200"
			width={size}
			xmlns="http://www.w3.org/2000/svg"
			style={{
				cursor: 'pointer',
				filter: isActive ? 'drop-shadow(0 0 8px rgba(25, 118, 210, 0.8))' : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
				transform: isActive ? 'scale(1.2)' : 'scale(1)',
				transition: 'all 0.3s ease',
			}}
		>
			<path
				d="M551.73,686.07c6.3-1.66,12.72-2.11,19.2-2.36,1.85-.07,3.96-.13,5.38-1.5.99-.95,1.51-2.35,2.28-3.46,1.25-1.8,2.92-3.22,4.84-4.26,4.23-2.29,9.35-2.78,14.08-2.6,2.53.1,5.54.78,7.99-.11,3.2-1.17,3.26-4.65,5.06-7.07,2.16-2.9,6.87-6.1,11.04-6.83,5.54-4.48,21.68-7.73,40.73-7.73,23.63,0,42.79,4.99,42.79,11.14,0,1.22-.76,2.39-2.16,3.49-1.61,2.9-4.72,4.94-7.74,6.43-2.45,1.21-5.08,2.22-7.21,3.97-2.51,2.07-3.19,5.04-5.02,7.57-3.05,4.24-7.73,5.75-12.73,6.12-3.35.25-6.67.24-9.35,2.55-2.05,1.77-3.39,4.19-5.63,5.77-4.19,2.96-9.51,2.52-14.34,1.98-3.45-.39-6.82-.8-10.25.02-3.07.74-6.01,1.98-9.15,2.47-2.21.35-4.54.38-6.72-.18-2.7-.7-4.22-2.64-6.62-3.83-3.3-1.63-7.33-.22-10.6.78-3.26.99-6.52,1.91-9.87,2.53-5.88,1.09-12.31,1.8-18.21.46-2.78-.64-5.07-2.34-7.77-3.07-3.55-.96-7.23,1.43-10.76,1.7-3.52.27-8.46-.77-9.01-4.98-.71-5.47,5.56-7.9,9.75-9.01Z"
				fill="#eaeadd"
				stroke="#53b069"
				strokeWidth="2"
			/>

			<g>
				<path
					d="M662.81,682.68c-8.35-8.35-19.67-13.04-31.48-13.04s-23.13,4.69-31.48,13.04"
					fill="none"
					stroke="#53b069"
					strokeLinecap="round"
					strokeWidth="3"
				/>
				<path
					d="M665.46,605.84c-8.18-4.72-17.9-6-27.02-3.56-9.12,2.44-16.9,8.41-21.62,16.59l61.68,35.61c4.72-8.18,6-17.9,3.56-27.02-2.44-9.12-8.41-16.9-16.59-21.62Z"
					fill="none"
					stroke="#53b069"
					strokeLinecap="round"
					strokeWidth="3"
				/>
				<line
					stroke="#53b069"
					strokeLinecap="round"
					strokeWidth="3"
					x1="647.66"
					x2="629.85"
					y1="636.68"
					y2="667.52"
				/>
			</g>

			<line
				stroke="#53b069"
				strokeLinecap="round"
				strokeWidth="4"
				x1="631"
				x2="631"
				y1="690"
				y2="725"
			/>

			<circle
				cx="631"
				cy="690"
				fill="#53b069"
				r="4"
			/>

			<text
				fill="#53b069"
				fontFamily="Arial, sans-serif"
				fontSize="24"
				fontWeight="bold"
				textAnchor="middle"
				x="700"
				y="750"
			>
				Praia da Figueirinha
			</text>
		</svg>
	);

	//
}
