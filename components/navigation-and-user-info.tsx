import React from 'react';
import { UserTopLevelInformation } from './user-top-level-information';
import { Box } from '@mui/system';
import DrawerMenuNavigation from './drawer-menu-navigation';

interface NavigationAndUserInfoProps {
	children?: React.ReactNode;
}

export const NavigationAndUserInfo: React.FC<NavigationAndUserInfoProps> = ({ children }: NavigationAndUserInfoProps): React.ReactNode => {
	return (
		<>
			<Box paddingLeft={26}>
				<UserTopLevelInformation />
			</Box>
			<Box sx={{ display: 'flex' }}>
				<DrawerMenuNavigation />
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					{children}
				</Box>
			</Box>
		</>
	);
}
