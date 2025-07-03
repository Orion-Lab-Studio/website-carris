'use client';

/* * */

import { FormSectionComments } from '@/components/form/FormSectionComments';
import { FormSectionCommsContact } from '@/components/form/FormSectionCommsContact';
import { FormSectionContacts } from '@/components/form/FormSectionContacts';
import { FormSectionCycles } from '@/components/form/FormSectionCycles';
import { FormSectionLocation } from '@/components/form/FormSectionLocation';
import { FormSectionSchoolCalendar } from '@/components/form/FormSectionSchoolCalendar';
import { Button, Flex } from '@mantine/core';

/* * */

interface Props {
	schoolId: string
}

/* * */

export function FormMainFields({ schoolId }: Props) {
	return (
		<Flex direction="column" gap="md">

			<FormSectionLocation schoolId={schoolId} />

			<FormSectionContacts />

			<FormSectionCommsContact />

			<FormSectionSchoolCalendar />

			<FormSectionCycles />

			<FormSectionComments />

			<Button
				size="xl"
				type="submit"
				// leftSection={
				// 	(
				// 		<div>
				// 			{submitState === 'processing' && <Loader color="white" size={16} />}
				// 			{submitState === 'done' && '✓'}
				// 			{submitState === 'error' && <IconX size={20} />}
				// 		</div>
				// 	)
				// }
			>
				Enviar
			</Button>

		</Flex>
	);
}
