'use client';

import React, { useEffect, useState } from 'react';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tab, Tabs } from '@mui/material';
import { tabs } from './types';

const filterQueryParamName: string = 'filter';
const defaultFirstEntryTab: string = 'uploaded';

const getCurrentTabValue = (filterQueryParam: string | null): string => {
	if (!filterQueryParam) {
		return defaultFirstEntryTab;
	}

	const isValidTabQueryParam = tabs.map((tab) => tab.value).includes(filterQueryParam);
	if (!isValidTabQueryParam) {
		return defaultFirstEntryTab;
	}

	return filterQueryParam;
};

const createQueryString = (name: string, value: string, searchParams: ReadonlyURLSearchParams) => {
	const params = new URLSearchParams(searchParams.toString());
	params.set(name, value);

	return params.toString();
};

export function ProjectTabs(): React.ReactNode {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const [currentSelectedTabValue, setCurrentSelectedTabValue] = useState(
		getCurrentTabValue(searchParams.get(filterQueryParamName)),
	);

	useEffect(() => {
		const validatedSelectedTab = getCurrentTabValue(currentSelectedTabValue);
		router.push(`${pathname}?${createQueryString(filterQueryParamName, validatedSelectedTab, searchParams)}`);
	}, [currentSelectedTabValue, pathname, router, searchParams]);

	const handleChange = (event: React.SyntheticEvent, newValue: string): void => {
		setCurrentSelectedTabValue(newValue);
		router.push(`${pathname}?${createQueryString(filterQueryParamName, newValue, searchParams)}`);
	};

	return (
		<Tabs value={currentSelectedTabValue} onChange={handleChange} aria-label="navigation-tabs-for-a-project-paper">
			{tabs.map((tab, index) => (
				<Tab key={index} label={tab.label} value={tab.value} />
			))}
		</Tabs>
	);
}
