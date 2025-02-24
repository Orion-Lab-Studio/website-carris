'use client';
/* * */

import Button from '@/components/common/Button';
import { Affix, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface Props {
	scrollValue: number
}

/* * */
export function GotoTopButton({ scrollValue }: Props) {
	//

	//
	// A. Setup Variables

	const [scroll, scrollTo] = useWindowScroll();
	const t = useTranslations();

	//
	// B. Render Components

	return (
		<Affix position={{ bottom: 20, right: 20 }}>
			<Transition mounted={scroll.y > scrollValue} transition="slide-up">
				{transitionStyles => (
					<Button
						icon={<IconArrowUp size={16} />}
						label={t('gotoTop')}
						onClick={() => scrollTo({ y: 0 })}
					/>
				)}
			</Transition>
		</Affix>
	);

	//
}
