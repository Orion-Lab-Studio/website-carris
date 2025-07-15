"use client"
import React, { useState } from "react";
import styles from './styles.module.css';
import { PressGenericCard } from "../PressGenericCard";
import { Select, TextInput } from "@mantine/core";
import { IconArrowLeft, IconSearch } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface NewsItem {
    id: string;
    title: string;
    date: string;
    topic: string;
    image: string;
    isLink: boolean;
}

export function PressNotesContentSection() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");

    const t = useTranslations('home.PressNotesBase');

    const newsItems: NewsItem[] = [
        {
            id: "1",
            title: "Resultados do Inquérito de Satisfação aos Passageiros",
            date: "30 de Abril de 2024",
            topic: "Tópico",
            image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594",
            isLink: true
        },
        {
            id: "2",
            title: "Balanço da operação Carris Metropolitana em 2024",
            date: "30 de Fevereiro de 2024",
            topic: "Tópico",
            image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594",
            isLink: true
        },
        {
            id: "3",
            title: "Resultados do Inquérito de Satisfação aos Passageiros",
            date: "30 de Abril de 2024",
            topic: "Tópico",
            image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594",
            isLink: true
        },
        {
            id: "4",
            title: "Resultados do Inquérito de Satisfação aos Passageiros",
            date: "30 de Abril de 2024",
            topic: "Tópico",
            image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594",
            isLink: true
        },
        {
            id: "5",
            title: "Resultados do Inquérito de Satisfação aos Passageiros",
            date: "30 de Abril de 2024",
            topic: "Tópico",
            image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594",
            isLink: false
        },
        {
            id: "6",
            title: "Resultados do Inquérito de Satisfação aos Passageiros",
            date: "30 de Abril de 2024",
            topic: "Tópico",
            image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594",
            isLink: false
        },
        {
            id: "7",
            title: "Resultados do Inquérito de Satisfação aos Passageiros",
            date: "30 de Abril de 2024",
            topic: "Tópico",
            image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594",
            isLink: false
        },
        {
            id: "8",
            title: "Resultados do Inquérito de Satisfação aos Passageiros",
            date: "30 de Abril de 2024",
            topic: "Tópico",
            image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-70665f891baf9314344e211ce2db6a12_screen.jpg?ts=1689413594",
            isLink: false
        }
    ];

    const filteredNews = newsItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedFilter === "" || item.topic === selectedFilter)
    );

    const handleTextInputChange = ({ currentTarget }) => {
        setSearchTerm(currentTarget.value);
    };

        return (
        <section className={styles.contentWrapper}>

            <div className={styles.breadcrumb}>
                <Link href="/" style={{color: "var(--System-Text-300, #9696A0)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem", lineHeight: "unset"}}> <IconArrowLeft size={"0.625rem"} color="var(--System-Text-300, #9696A0)" /> HOME PAGE  </Link> / <Link href="/press" style={{color: "var(--System-Text-300, #9696A0)", lineHeight: "unset"}}>IMPRENSA</Link> / <p style={{color: "var(--System-Text-300, #9696A0)", textTransform: "uppercase", lineHeight: "unset"}}>{t('section_heading')}</p>
            </div>

            <div className={styles.description}>
                <h2>{t('section_heading')}</h2>
                <p>{t('subheading')}</p>
            </div>

            <div className={styles.searchFilterContainer}>
                <div className={styles.searchContainer}>
                    <TextInput leftSection={<IconSearch size={20} />} onChange={handleTextInputChange} placeholder="Pesquisar..." type="search" value={searchTerm} w="100%" />
                    
                </div>
                <div className={styles.filterContainer}>
                    <Select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e)}
                        className={styles.filterSelect}
                        data={[
                            { value: "", label: "Filtrar por tópico..." },
                            { value: "Tópico", label: "Tópico" },
                            { value: "Relatório", label: "Relatório" },
                            { value: "Notícia", label: "Notícia" }
                        ]}
                    >
                       
                    </Select>
                </div>
            </div>

            <div className={styles.resultsCount}>
                <p>Encontradas {filteredNews.length} notícias:</p>
            </div>

            <div className={styles.newsGrid}>
                {filteredNews.map((item) => (
                    <PressGenericCard 
                        key={item.id} 
                        newsItem={item}
                        showTopic={false}
                        onClick={(newsItem) => {
                            console.log('Clicked news item:', newsItem);
                        }}
                    />
                ))}
            </div>
        </section>
    );
} 