import React from 'react';
import { Box, Typography } from '@mui/material';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { redirect } from 'next/navigation';

export async function UserTopLevelInformation() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) {
		redirect('/');
	}

	return (
		<Box display="flex" justifyContent="space-between" alignItems="center" padding={6}>
			<Box>
				<Typography variant="h6">Hello, {user.given_name}</Typography>
				<Typography variant="body1">Have a nice day</Typography>
			</Box>
			<div className="profile-blob">
				{user?.picture ? (
					<img
						className="avatar"
						src={user?.picture}
						alt="user profile avatar"
						referrerPolicy="no-referrer"
					/>
				) : (
					<div className="avatar">
						{user?.given_name?.[0]}
						{user?.family_name?.[0]}
					</div>
				)}
				<div>
					<p className="text-heading-2">
						{user?.given_name} {user?.family_name}
					</p>

					<LogoutLink className="text-subtle">Log out</LogoutLink>
				</div>
			</div>
		</Box>
	);
}
