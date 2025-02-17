/* * */

import { Survey2024Page } from '@/components/survey-2024/Survey2024Page';
import { type Metadata } from 'next';

/* * */

export const metadata: Metadata = {
	description: 'Explore a verdadeira dimensão da CMetropolitana em 2024.',
	title: 'CMetropolitana | Inquérito 2024',
};

/* * */
export default function Page() {
	return <Survey2024Page />;
}
