'use client';

/* * */

import CustomTimeInput from '@/components/CustomTimeInput/CustomTimeInput';
import { Checkbox, Collapse, Paper, Stack, Text } from '@mantine/core';

/* * */

export function CycleItemSection({ form, itemKey, label }) {
	//

	//
	// A. Setup Variables

	const morningEntryProps = form.getInputProps(itemKey + '.morningEntry', { type: 'input' });
	const morningExitProps = form.getInputProps(itemKey + '.morningExit', { type: 'input' });
	const afternoonEntryProps = form.getInputProps(itemKey + '.afternoonEntry', { type: 'input' });
	const afternoonExitProps = form.getInputProps(itemKey + '.afternoonExit', { type: 'input' });

	const checked = form.values[itemKey].hasCicle;

	//
	// B. Render Component

	return (
		<Paper bg={checked ? 'var(--mantine-color-blue-light)' : ''} shadow="none">
			<Stack p={8}>

				<Checkbox
					c={checked ? 'blue' : ''}
					fw={700}
					label={label}
					{...form.getInputProps(itemKey + '.hasCicle', { type: 'checkbox' })}
				/>

				<Collapse in={checked}>
					<Stack gap={10}>
						<div>
							<Text size="s">Principal hora de entrada de manhã</Text>
							<CustomTimeInput
								inputProps={morningEntryProps}
							/>
						</div>
						<div>
							<Text size="s">Principal hora de saída de manhã</Text>
							<CustomTimeInput
								inputProps={morningExitProps}
							/>
						</div>
						<div>
							<Text size="s">Principal hora de entrada de tarde</Text>
							<CustomTimeInput
								inputProps={afternoonEntryProps}
							/>
						</div>
						<div>
							<Text size="s">Principal hora de saída de tarde</Text>
							<CustomTimeInput
								inputProps={afternoonExitProps}
							/>
						</div>
					</Stack>
				</Collapse>

			</Stack>
		</Paper>
	);

	//
}
