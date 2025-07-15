'use client';

/* * */

import Carousel from '@/components/common/CarouselControlled';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { PressGenericCard } from '@/components/home/PressGenericCard';
import { NewsCardSkeleton } from '@/components/news/NewsCardSkeleton';
import { SeeMoreCard } from '@/components/news/SeeMoreCard';
import { useTranslations } from 'next-intl';

/* * */

// Mock data interface
interface NewsItem {
	id: string;
	title: string;
	date: string;
	topic: string;
	image: string;
	isLink: boolean;
}

// Mock data for knowledge base
const mockKnowledgeBase: NewsItem[] = [
	{
		id: "1",
		title: "Manual de Normas da Carris Metropolitana",
		date: "20 de Janeiro de 2025",
		topic: "Documentação",
		image: "/assets/common/placeholder.png",
		isLink: false
	},
	{
		id: "2",
		title: "Kit de Comunicação - Logos e Imagens Oficiais",
		date: "18 de Janeiro de 2025",
		topic: "Recursos",
		image: "/assets/common/placeholder.png",
		isLink: false
	},
	{
		id: "3",
		title: "Dados Abertos da Rede CMetropolitana",
		date: "15 de Janeiro de 2025",
		topic: "Open Data",
		image: "/assets/common/placeholder.png",
		isLink: true
	},
	{
		id: "4",
		title: "Relatório de Impacto Ambiental 2024",
		date: "12 de Janeiro de 2025",
		topic: "Sustentabilidade",
		image: "/assets/common/placeholder.png",
		isLink: false
	},
	{
		id: "5",
		title: "Guia de Comunicação para Jornalistas",
		date: "10 de Janeiro de 2025",
		topic: "Imprensa",
		image: "/assets/common/placeholder.png",
		isLink: false
	},
	{
		id: "6",
		title: "API Documentation - Integração de Sistemas",
		date: "08 de Janeiro de 2025",
		topic: "Tecnologia",
		image: "/assets/common/placeholder.png",
		isLink: true
	}
];

export function PressKnowledgeBase() {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.PressKnowledgeBase');

	//
	// B. Transform data

	const carouselSlides = mockKnowledgeBase.map(slideItem => ({
		_id: slideItem.id,
		component: (
			<PressGenericCard
				newsItem={slideItem}
				showTopic={true}
				onClick={(newsItem) => {
					console.log('Clicked knowledge base item:', newsItem);
					// Handle navigation or modal opening here
				}}
			/>
		),
	}));

	// Add "See More" card as last item
	if (carouselSlides) {
		carouselSlides.push({
			_id: 'see-more',
			component: <SeeMoreCard href="/press/knowledge-base" />,
		});
	}

	//
	// C. Render components

	return (
		<Surface>
			<Section heading={t('section_heading')} href="/press/knowledge-base">
				<Carousel subheading={t('subheading')} skeletonComponent={<NewsCardSkeleton />} skeletonQty={4} slides={carouselSlides} />
			</Section>
		</Surface>
	);
}
