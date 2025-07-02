'use client';

/* * */

import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import 'maplibre-gl/dist/maplibre-gl.css';

/* * */

import '@/theme/styles/reset.css';
import '@/theme/styles/variables.css';

/* * */

import { createTheme, type MantineThemeOverride } from '@mantine/core';

/* * */

export const themeData: MantineThemeOverride = createTheme({
	//

	components: {

		// Accordion: Accordion.extend({
		// 	classNames: () => {
		// 		const defaultClasses = {
		// 			chevron: AccordionOverride.chevron,
		// 			content: AccordionOverride.content,
		// 			control: AccordionOverride.control,
		// 			icon: AccordionOverride.icon,
		// 			item: AccordionOverride.item,
		// 			label: AccordionOverride.label,
		// 			root: AccordionOverride.root,
		// 		};
		// 		return defaultClasses;
		// 	},
		// 	defaultProps: {
		// 		chevron: <IconCaretLeftFilled />,
		// 	},
		// }),

	},

	fontFamily: 'var(--font-inter)',

	//
});
