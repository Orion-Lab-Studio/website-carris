/* * */

import faqData from './data.json';

/* * */

export async function GET() {
	return Response.json(faqData);
}
