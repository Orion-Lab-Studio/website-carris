/* * */

import { WebsiteViewport } from '@/components/viewport/WebsiteViewport';
import { ConfigProviders } from '@/providers/config-providers';
import { DataProviders } from '@/providers/data-providers';
import { MapProviders } from '@/providers/map-providers';
import { ProfileProviders } from '@/providers/profile-providers';
import { ThemeProviders } from '@/providers/theme-providers';
import { websiteTheme } from '@/themes/website/website.theme';
import { Notifications } from '@mantine/notifications';
import { NuqsAdapter } from 'nuqs/adapters/next';

/* * */

export default function Layout({ children }) {
	return (
		<ConfigProviders>
			<ThemeProviders themeData={websiteTheme} themeId="website">
				<NuqsAdapter>
					<DataProviders>
						<ProfileProviders>
							<MapProviders>
								<Notifications styles={{ root: { marginTop: '60px' } }} />
								<WebsiteViewport>
									{children}
								</WebsiteViewport>
							</MapProviders>
						</ProfileProviders>
					</DataProviders>
				</NuqsAdapter>
			</ThemeProviders>
		</ConfigProviders>
	);
}
