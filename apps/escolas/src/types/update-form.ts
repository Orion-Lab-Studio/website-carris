/* * */

/**
 * A start and end date pair, where each date can be null.
 * This is useful for representing date ranges where
 * the start or end date might not be defined.
 */
export type DatePair = [ Date | null, Date | null ];

/**
 * Types for the update form used in the school update portal.
 * This form collects various information about the school, including contact details,
 * calendar information, and school cycles.
 */
export interface UpdateForm {
	calendar: {
		cycleFrequency: '' | 'semester' | 'trimester'
		dates: DatePair[]
		vacations: DatePair[]
	}
	comment: string
	correctLocation: '' | 'nao' | 'quase' | 'sim'
	cycles: Record<SchoolCicle, {
		afternoonEntry: string
		afternoonExit: string
		hasCicle: boolean
		morningEntry: string
		morningExit: string
	}>
	email: string
	fillerIdentifier: string
	fillerIdentifierPosition: string
	id: string
	password: string
	phone: string
	postal_code: string
	submissionDate: string
	url: string
};
