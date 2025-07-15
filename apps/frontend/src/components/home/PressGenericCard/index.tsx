import React from "react";
import { IconFileDownload, IconLink } from '@tabler/icons-react';
import styles from './styles.module.css';

interface NewsItem {
    id: string;
    title: string;
    date: string;
    topic: string;
    image: string;
    isLink: boolean;
}

interface PressGenericCardProps {
    newsItem: NewsItem;
    showTopic?: boolean;
    onClick?: (newsItem: NewsItem) => void;
}

export function PressGenericCard({ newsItem, showTopic = false, onClick }: PressGenericCardProps) {
    const handleClick = () => {
        if (onClick) {
            onClick(newsItem);
        }
    };

    return (
        <div className={styles.newsCard} onClick={handleClick}>
            <div className={styles.newsImageContainer}>
                <img src={newsItem.image} alt={newsItem.title} className={styles.newsImage} />
                <div className={styles.darkOverlay} />
                <div className={styles.iconOverlay}>
                    {newsItem.isLink ? (
                        <IconLink size={32} className={styles.overlayIcon} />
                    ) : (
                        <IconFileDownload size={32} className={styles.overlayIcon} />
                    )}
                </div>
            </div>
            <div className={styles.newsContent}>
                <div className={styles.newsMetadata}>
                    <span className={styles.newsDate}>
                        {showTopic ? `${newsItem.date} | ${newsItem.topic}` : newsItem.date}
                    </span>
                </div>
                <h3 className={styles.newsTitle}>{newsItem.title}</h3>
            </div>
        </div>
    );
}