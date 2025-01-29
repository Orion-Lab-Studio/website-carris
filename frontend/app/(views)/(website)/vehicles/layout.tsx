/* * */

import { VehiclesContextProvider } from '@/contexts/Vehicles.context';

/* * */

export default function Layout({ children }) {
	return (
		<VehiclesContextProvider>
			{children}
		</VehiclesContextProvider>
	);
}
