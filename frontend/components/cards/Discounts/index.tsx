/* * */

import { Surface } from '@/components/layout/Surface';
import { Discount } from '@/types/discount.types';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export const availableDiscounts = ['normal', 'sub18', 'sub23', 'social-a', 'social-b', 'plus-65', 'combatente-plus-65', 'combatente-minus-65', 'family'];

/* * */

export function Discounts() {
	//

	//
	// A. Setup variables

	const t = useTranslations('cards.Discounts');

	//
	// B. Transform data

	const formattedDiscounts: Discount[] = availableDiscounts.map(discount => ({
		description: t(`products.${discount}.description`),
		id: discount,
		price_metropolitano: t(`products.${discount}.price_metropolitano`),
		price_municipal: t(`products.${discount}.price_municipal`),
		title: t(`products.${discount}.title`),
	}));

	//
	// C. Render components

	return (
		formattedDiscounts.map(discount => (
			<Surface key={discount.id} variant="persistent">
				<div className={styles.container}>
					<div className={styles.info}>
						<h3 className={styles.title}>{discount.title}</h3>
						<p className={styles.description}>{discount.description}</p>
					</div>
					<div className={styles.pricing}>
						<div className={styles.pricingItem}>
							<h3 className={styles.priceValue}>{discount.price_metropolitano}</h3>
							<p className={styles.priceLabel}>{t('pass_types.metropolitano')}</p>
							{discount.id === 'family' && <p className={styles.priceLabel}>{t('pass_types.family')}</p>}
						</div>
						<div className={styles.pricingItem}>
							<h3 className={`${styles.priceValue} ${discount.price_municipal.toLowerCase() === 'n/a' && styles.na}`}>{discount.price_municipal}</h3>
							<p className={`${styles.priceLabel} ${discount.price_municipal.toLowerCase() === 'n/a' && styles.na}`}>{t('pass_types.municipal')}</p>
							{discount.id === 'family' && <p className={styles.priceLabel}>{t('pass_types.family')}</p>}
						</div>
					</div>
				</div>
			</Surface>
		))
	);

	//
}
