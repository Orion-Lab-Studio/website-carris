'use client';

/* * */

import { CycleItemSection } from '@/components/update-portal/CycleItemSection';
import { Paper, Stack, Text, Title } from '@mantine/core';

/* * */

export function ModalitiesSection({ form }) {
	return (
		<Paper p={16} radius="md" shadow="sm">
			<Stack gap={10}>
				<div style={{ marginBottom: '10px', marginLeft: '4px' }}>
					<Title fw={700} order={3}>Modalidades de ensino</Title>
					<Text c="dimmed" size="sm">Indique os ciclos e outros tipos de ensino presentes na escola</Text>
				</div>
				<Stack gap="sm">
					<CycleItemSection form={form} itemKey="pre_school" label="Pré-escolar" />
					<CycleItemSection form={form} itemKey="basic_1" label="1º Ciclo" />
					<CycleItemSection form={form} itemKey="basic_2" label="2º Ciclo" />
					<CycleItemSection form={form} itemKey="basic_3" label="3º Ciclo" />
					<CycleItemSection form={form} itemKey="high_school" label="Secundário" />
					<CycleItemSection form={form} itemKey="professional" label="Profissional" />
					<CycleItemSection form={form} itemKey="special" label="Especial" />
					<CycleItemSection form={form} itemKey="artistic" label="Artístico" />
					<CycleItemSection form={form} itemKey="university" label="Universitário" />
					<CycleItemSection form={form} itemKey="other" label="Outro" />
				</Stack>
			</Stack>
		</Paper>
	);
}
