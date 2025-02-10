/* * */

import { useTranslations } from 'next-intl';

/* * */
export function VehiclesListInfoBlock() {
	//
	// A. Setup variables

	const t = useTranslations('vehicles.VehiclesListInfoBlock');

	//
	// B. Render components
	return (
		<>
			<p>{t('heading')}</p>
		</>
	);
}
