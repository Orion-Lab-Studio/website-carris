/* * */

import { LinesDetail } from '@/components/lines/LinesDetail';
import { LinesDetailContextProvider } from '@/contexts/LinesDetail.context';
import { Routes } from '@/utils/routes';
import { Municipality } from '@carrismetropolitana/api-types/locations';
import { type Line } from '@carrismetropolitana/api-types/network';
import { type Metadata } from 'next';

/* * */

export async function generateMetadata({ params }): Promise<Metadata> {
	//

	//
	// A. Setup variables

	const { line_id } = await params;

	//
	// B. Fetch data

	const allLinesResponse = await fetch(`${Routes.API}/lines`);
	const allMunicipalitiesResponse = await fetch(`${Routes.API}/locations/localities`);
	const allLinesData: Line[] = await allLinesResponse.json();
	const allMunicipalitiesData = await allMunicipalitiesResponse.json();

	//
	// C. Transform data

	const lineData = allLinesData.find(item => item.id === line_id);
	const localityIds = lineData?.locality_ids;
	const goesTrough = allMunicipalitiesData.data.find(item => localityIds && localityIds.includes(item.id));
	//
	// D. Render components

	return {
		description: `Horários em tempo real da linha ${lineData?.short_name}. Esta linha passa por: ${goesTrough}`,
		title: `${lineData?.short_name} | ${lineData?.long_name}`,
	};

	//
}

/* * */

export default async function Page({ params }) {
	const { line_id } = await params;
	return (
		<LinesDetailContextProvider lineId={line_id}>
			<LinesDetail />
		</LinesDetailContextProvider>
	);
}
