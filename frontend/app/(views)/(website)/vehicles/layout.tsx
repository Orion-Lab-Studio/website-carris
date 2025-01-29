/* * */

import { StoresListContextProvider } from '@/contexts/StoresList.context';
import { VehiclesContextProvider } from '@/contexts/Vehicles.context';

/* * */

export default function Layout({ children }) {
	return (
		<StoresListContextProvider>
			{children}
		</StoresListContextProvider>
	);
}
