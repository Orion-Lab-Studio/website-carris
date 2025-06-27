'use client';

import { Select } from '@mantine/core';

import styles from './SelectEducationLevel.module.css';

export default function SelectEducationLevel({ onSelectEducationLevel, selectedEducationLevel }) {
	//
	// A. Setup variables

	const allEducationLevels = [
		{ label: 'Pré-escolar', value: 'pre_school' },
		{ label: '1º Ciclo', value: 'basic_1' },
		{ label: '2º Ciclo', value: 'basic_2' },
		{ label: '3º Ciclo', value: 'basic_3' },
		{ label: 'Secundário', value: 'high_school' },
		{ label: 'Ensino Profissional', value: 'professional' },
		{ label: 'Ensino Especial', value: 'special' },
		{ label: 'Ensino Artístico', value: 'artistic' },
		{ label: 'Universidade', value: 'university' },
		{ label: 'Outros', value: 'other' },
	];

	//
	// C. Handle actions

	//
	// D. Render components

	return (
		<div className={styles.container}>
			<Select
				aria-label="Filtrar por nível de escolaridade"
				data={allEducationLevels}
				onChange={onSelectEducationLevel}
				placeholder="Escolha um nível de educação"
				value={selectedEducationLevel}
				clearable
				searchable
			/>
		</div>
	);

	//
}
