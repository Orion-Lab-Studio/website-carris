/* * */

export interface Survery2024AboutCardSchema {
	_id: string
	colors: {
		border?: string
		primary: string
	}
	content: {
		legend: string
	}
	header: {
		value: string
	}
	stat_level: number
}

/* * */

export const allAboutCardsData: Survery2024AboutCardSchema[] = [
	//

	//
	{
		_id: 'Total_Interviews',
		colors: {
			border: '#FFFFFF',
			primary: '#FFDD00',
		},
		content: {
			legend: 'Total de entrevistas concretizadas',
		},
		header: {
			value: '3200',
		},
		stat_level: 1,
	},

	{
		_id: 'Total_Interviewers',
		colors: {
			border: '#BEBEC8',
			primary: '#FAFAFA',
		},
		content: {
			legend: 'Entrevistadores',
		},
		header: {
			value: '55',
		},
		stat_level: 1,
	},

	{
		_id: 'Total_Lines',
		colors: {
			border: '#BEBEC8',
			primary: '#FAFAFA',
		},
		content: {
			legend: 'Linhas Analisadas',
		},
		header: {
			value: '199',
		},
		stat_level: 1,
	},

	{
		_id: 'Total_Classes',
		colors: {
			border: '#BEBEC8',
			primary: '#FAFAFA',
		},
		content: {
			legend: 'Classes Amostrais Representativas',
		},
		header: {
			value: '192',
		},
		stat_level: 1,
	},

	{
		_id: 'Total_Trust_1',
		colors: {
			border: '#BEBEC8',
			primary: '#FAFAFA',
		},
		content: {
			legend: 'Intervalo de Confiança',
		},
		header: {
			value: '95,5%',
		},
		stat_level: 2,
	},
	{
		_id: 'Total_Trust_2',
		colors: {
			border: '#BEBEC8',
			primary: '#FAFAFA',
		},
		content: {
			legend: 'Margem de Erro',
		},
		header: {
			value: '1,80%',
		},
		stat_level: 2,
	},
];
