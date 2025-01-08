'use client';

/* * */

import { Review2024Intro } from '@/components/review-2024/Review2024Intro';
import { Review2024LevelOne } from '@/components/review-2024/Review2024LevelOne';
import { Review2024TabSelector } from '@/components/review-2024/Review2024TabSelector';
import { useState } from 'react';

/* * */

export function Review2024Page() {
	//

	//
	// A. Setup variables

	const [selectedTab, setSelectedTab] = useState('overview');

	//
	// B. Render components

	return (
		<>
			<Review2024Intro />
			<Review2024TabSelector onSelectTab={setSelectedTab} selectedTab={selectedTab} />
			<Review2024LevelOne />
		</>
	);

	//
}
