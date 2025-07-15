import { Button, FileInput, Input, Textarea } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

const SectionHeader = () => {
	const t = useTranslations('home.PressContact');
	return (
		<div className={styles.pressLabelSectionHeader}>
			<h1>{t('section_heading')}</h1>
		</div>
	);
};

export function PressContact() {
	const t = useTranslations('home.PressContact');
	return (
		<section id="press-contact-form" className={styles.container}>
			<SectionHeader />

			<div className={styles.formContainer}>
				<div className={styles.formRow}>
					<Input.Wrapper className={styles.formInput} label={t('form.name')} withAsterisk>
						<Input size="md" />
					</Input.Wrapper>
					<Input.Wrapper className={styles.formInput} label={t('form.surname')} withAsterisk>
						<Input size="md" />
					</Input.Wrapper>
				</div>

				<div className={styles.formRow}>
					<Input.Wrapper className={styles.formInput} label={t('form.email')} withAsterisk>
						<Input size="md" />
					</Input.Wrapper>
					<Input.Wrapper className={styles.formInput} label={t('form.phone')}>
						<Input size="md" />
					</Input.Wrapper>
				</div>

				<div className={styles.formRow} data-variant="col-full">
					<Input.Wrapper className={styles.formInput} label={t('form.organization')} withAsterisk>
						<Input size="md" />
					</Input.Wrapper>
				</div>

				<div className={styles.formRow} data-variant="col-full">
					<Input.Wrapper className={styles.formInput} label={t('form.subject')} withAsterisk>
						<Input size="md" />
					</Input.Wrapper>
				</div>

				<div className={styles.formRow} data-variant="col-full">
					<Textarea className={styles.formInputTextarea} label={t('form.message')} withAsterisk />
				</div>

				<div className={styles.formRow} data-variant="col-full">
					<FileInput accept="image/*" className={styles.formInputFile} label={t('form.file')} placeholder={t('form.placeholderFile')} size="md" />
				</div>

				<Button className={styles.formButton} size="compact-lg">{t('form.send')}</Button>

			</div>
		</section>
	);
}
