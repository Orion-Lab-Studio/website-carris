'use client';

/* * */

import { availableFormats } from '@/i18n/config';
import messages from '@/i18n/translations/en.json';
import { NextIntlClientProvider } from 'next-intl';
import { createContext, useContext, useEffect, useState } from 'react';

/* * */

interface LocaleContextState {
	actions: {
		toggleLocaleMode: () => void
	}
	flags: {
		is_debug_mode: boolean
	}
}

/* * */

const LocaleContext = createContext<LocaleContextState | undefined>(undefined);

export function useLocaleContext() {
	const context = useContext(LocaleContext);
	if (!context) {
		throw new Error('useLocaleContext must be used within a LocaleContextProvider');
	}
	return context;
}

/* * */

export const LocaleContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [flagIsLocaleModeState, setFlagIsLocaleModeState] = useState<boolean>(false);

	//
	// B. Handle actions

	useEffect(() => {
		// Capture debug mode state when it changes.
		// This should stay in its own use effect to ensure the latest value of flagIsLocaleModeState is captured.
	}, [flagIsLocaleModeState]);

	const toggleLocaleMode = () => {
		setFlagIsLocaleModeState(prev => !prev);
	};

	//
	// C. Define context value

	const contextValue: LocaleContextState = {
		actions: {
			toggleLocaleMode,
		},
		flags: {
			is_debug_mode: flagIsLocaleModeState,
		},
	};

	//
	// D. Render components

	return (
		<LocaleContext.Provider value={contextValue}>
			<NextIntlClientProvider formats={availableFormats} locale="en" messages={messages}>
				{children}
			</NextIntlClientProvider>
		</LocaleContext.Provider>
	);

	//
};
