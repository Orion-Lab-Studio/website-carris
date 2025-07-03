/* * */

import { FormMain } from '@/components/form/FormMain';

/* * */

export default async function Page({ params }) {
	//

	//
	// A. Setup variables

	const { school_id } = await params;

	//
	// B. Render components

	return <FormMain schoolId={school_id} />;

	//
}
