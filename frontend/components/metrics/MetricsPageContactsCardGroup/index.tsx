/* * */

import { MetricsContactsPageCardGroupCard } from '@/components/metrics/MetricsPageContactsCardGroupCard';
import { Complaints } from '@carrismetropolitana/api-types/metrics';

import styles from './styles.module.css';
/* * */
interface Props {
	data: Complaints[]
	filter_type: string
	filter_value: string
	totalPassengersLastWeek: number
}

/* * */
export function MetricsContactsPageCardGroup({ data, filter_type, filter_value, totalPassengersLastWeek }: Props) {
	//
	console.log('Data received => ', filter_type, filter_value, totalPassengersLastWeek);
	//
	// A. Fetch data

	const calcPercentage = (value: number, total: number) => {
		return `${((value / total) * 100).toFixed(3)}%`;
	};

	const cardData = [
		{
			description1: 'total de pedidos de informação',
			description2: calcPercentage(data.reduce((acc, item) => acc + item.info_requests, 0), totalPassengersLastWeek),
			description3: 'do total de passageiros transportados na amL na última semana',
			image: '/assets/complaints/pedidos_info.svg',
			subheading: 'área metropolitana de Lisboa',
			title: 'Pedidos de Informação',
			value: data.reduce((acc, item) => acc + item.info_requests, 0),
		},
		{
			description1: 'total de reclamações',
			description2: calcPercentage(data.reduce((acc, item) => acc + item.complaints, 0), totalPassengersLastWeek),
			description3: 'do total de passageiros transportados na amL na última semana',
			image: '/assets/complaints/reclamacoes_info.svg',
			subheading: 'área metropolitana de Lisboa',
			title: 'Reclamações', value: data.reduce((acc, item) => acc + item.complaints, 0) },
		{
			description1: 'total de outro* tipo de contactos',
			description2: calcPercentage(data.reduce((acc, item) => acc + item.other, 0), totalPassengersLastWeek),
			description3: 'do total de passageiros transportados na amL na última semana',
			footer: '*perdidos e achados, sugestões e agradecimentos',
			image: '/assets/complaints/outros_info.svg',
			subheading: 'área metropolitana de Lisboa',
			title: 'Outros*', value: data.reduce((acc, item) => acc + item.other, 0) },
	];
	//
	// C. Render domponents
	return (
		<div className={styles.container}>
			{cardData.map((card, index) => (
				<MetricsContactsPageCardGroupCard key={index} description1={card.description1.toString()} description2={card.description2} description3={card.description3} footer={card.footer} image={card.image} subheading={card.subheading} title={card.title} value={card.value} />
			))}
		</div>
	);
	//
}
