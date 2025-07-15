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

// Mock data
const mockPressNotes: NewsItem[] = [
	{
		id: "1",
		title: "Nova Linha de Apoio ao Passageiro 24/7",
		date: "15 de Janeiro de 2025",
		topic: "Comunicação",
		image: "/assets/common/placeholder.png",
		isLink: true
	},
	{
		id: "2",
		title: "Expansão da Rede CMetropolitana para 2025",
		date: "10 de Janeiro de 2025",
		topic: "Expansão",
		image: "/assets/common/placeholder.png",
		isLink: true
	},
	{
		id: "3",
		title: "Relatório Anual de Sustentabilidade 2024",
		date: "08 de Janeiro de 2025",
		topic: "Sustentabilidade",
		image: "/assets/common/placeholder.png",
		isLink: false
	},
	{
		id: "4",
		title: "Balanço da Operação CMetropolitana em 2024",
		date: "05 de Janeiro de 2025",
		topic: "Operação",
		image: "/assets/common/placeholder.png",
		isLink: true
	},
	{
		id: "5",
		title: "Modernização da Frota: Novos Autocarros Elétricos",
		date: "02 de Janeiro de 2025",
		topic: "Inovação",
		image: "/assets/common/placeholder.png",
		isLink: false
	},
	{
		id: "6",
		title: "Resultados do Inquérito de Satisfação 2024",
		date: "30 de Dezembro de 2024",
		topic: "Qualidade",
		image: "/assets/common/placeholder.png",
		isLink: false
	}
];

export function PressNotesBase() {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.PressNotesBase');

	//
	// B. Transform data

	const carouselSlides = mockPressNotes.map(slideItem => ({
		_id: slideItem.id,
		component: (
			<PressGenericCard
				newsItem={slideItem}
				showTopic={false}
				onClick={(newsItem) => {
					console.log('Clicked press note:', newsItem);
					// Handle navigation or modal opening here
				}}
			/>
		),
	}));

	// Add "See More" card as last item
	if (carouselSlides) {
		carouselSlides.push({
			_id: 'see-more',
			component: <SeeMoreCard href="/press/notes" />,
		});
	}

	//
	// C. Render components

	return (
		<Surface>
			<Section heading={t('section_heading')} href="/press/notes">
				<Carousel subheading={t('subheading')} skeletonComponent={<NewsCardSkeleton />} skeletonQty={4} slides={carouselSlides} />
			</Section>
		</Surface>
	);
}
