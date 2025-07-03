'use client';

/* * */

import { FormSectionCyclesItem } from '@/components/form/FormSectionCyclesItem';
import { Paper, Stack, Text, Title } from '@mantine/core';

/* * */

export function FormSectionCycles() {
	return (
		<Paper p={16} radius="md" shadow="sm">
			<Stack gap={10}>
				<div style={{ marginBottom: '10px', marginLeft: '4px' }}>
					<Title fw={700} order={3}>Modalidades de ensino</Title>
					<Text c="dimmed" size="sm">Indique os ciclos e outros tipos de ensino presentes na escola</Text>
				</div>
				<Stack gap="sm">
					<FormSectionCyclesItem fieldKey="pre_school" label="Pré-escolar" />
					<FormSectionCyclesItem fieldKey="basic_1" label="1º Ciclo" />
					<FormSectionCyclesItem fieldKey="basic_2" label="2º Ciclo" />
					<FormSectionCyclesItem fieldKey="basic_3" label="3º Ciclo" />
					<FormSectionCyclesItem fieldKey="secondary" label="Secundário" />
					<FormSectionCyclesItem fieldKey="professional" label="Profissional" />
					<FormSectionCyclesItem fieldKey="special" label="Especial" />
					<FormSectionCyclesItem fieldKey="artistic" label="Artístico" />
					<FormSectionCyclesItem fieldKey="university" label="Universitário" />
					<FormSectionCyclesItem fieldKey="other" label="Outro" />
				</Stack>
			</Stack>
		</Paper>
	);
}
