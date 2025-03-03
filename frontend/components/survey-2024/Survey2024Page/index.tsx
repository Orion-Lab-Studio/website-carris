'use client';

/* * */

import { Survey2024GlobalSatisfactionIndex } from '@/components/survey-2024/Survey2024GlobalSatisfactionIndex';
import { Survey2024Header } from '@/components/survey-2024/Survey2024Header';
import { Survey2024Intro } from '@/components/survey-2024/Survey2024Intro';
import { Survey2024LevelAbout } from '@/components/survey-2024/Survey2024LevelAbout';
import { Survey2024LevelPasgrCharacter } from '@/components/survey-2024/Survey2024LevelPasgrCharacter';
import { Survey2024LevelResults } from '@/components/survey-2024/Survey2024LevelResults';

/* * */

export function Survey2024Page() {
	//

	//
	// A. Render components

	return (
		<>
			<Survey2024Intro />
			<Survey2024Header />
			<Survey2024LevelAbout />
			<Survey2024LevelPasgrCharacter />
			<Survey2024LevelResults />
			<Survey2024GlobalSatisfactionIndex />
		</>
	);

	//
}
