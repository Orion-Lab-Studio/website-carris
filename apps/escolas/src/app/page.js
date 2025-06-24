'use client';

import Layout from '@/components/Layout/Layout';
import SelectMunicipalityAndSchool from '@/components/SelectMunicipalityAndSchool/SelectMunicipalityAndSchool';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const [selectedMunicipalityId, setSelectedMunicipalityId] = useState(null);
	const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
	const [selectedSchool, _setSelectedSchool] = useState();

	//
	// B. Handle actions

	const handleSelectSchool = (schooldId) => {
		if (schooldId) router.push(`/${schooldId}`);
	};

	//
	// C. Render components

	return (
		<Layout>
			<SelectMunicipalityAndSchool
  title="Pesquise as linhas que servem a sua escola ou universidade."
  selectedMunicipalityId={selectedMunicipalityId}
  onSelectMunicipalityId={setSelectedMunicipalityId}
  selectedEducationLevel={selectedEducationLevel}
  onSelectEducationLevel={setSelectedEducationLevel}
  selectedSchool={selectedSchool}
  onSelectSchool={handleSelectSchool}
			/>
		</Layout>
	);

	//
}
