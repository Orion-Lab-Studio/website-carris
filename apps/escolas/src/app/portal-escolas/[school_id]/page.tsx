/* * */

import { UpdatePortalSchoolDetail } from '@/components/update-portal/UpdatePortalSchoolDetail';

/* * */

export default async function Page({ params }) {
	//

	//
	// A. Setup variables

	const { school_id } = await params;

	//
	// B. Render components

	return <UpdatePortalSchoolDetail schoolId={school_id} />;

	//
}
