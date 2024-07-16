import React from 'react';
import { NavigationAndUserInfo } from '../../../components/navigation-and-user-info';
import { Stack } from '@mui/material';

interface ProjectParams {
	params: {
		id: number;
	};
}

export default function Project({ params }: ProjectParams): React.ReactNode {
	return (
		<NavigationAndUserInfo>
			<Stack spacing={2} alignItems="end"></Stack>
		</NavigationAndUserInfo>
	);
}
