import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Authenticate from '../components/authenticate';
import { NavigationAndUserInfo } from '../components/navigation-and-user-info';
import React from 'react';
import prisma from '../lib/db';

export const metadata = {
	title: 'Research Assistant',
	description: 'Research Assistant, your research best buddy',
};

interface KindeUserMapping {
	email: string;
	name: string;
	lastName: string;
}

async function ensureUserIsPresentInOurDb(kindeUser: KindeUserMapping): Promise<void> {
	await prisma.user.upsert({
		where: {
			email: kindeUser.email,
		},
		create: {
			email: kindeUser.email,
			userName: kindeUser.name,
			lastName: kindeUser.lastName,
		},
		update: {},
	});
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, getUser } = getKindeServerSession();
	const isLogged = await isAuthenticated();
	const user = await getUser();

	if (user) {
		// TODO: see if those fields can ever be null
		await ensureUserIsPresentInOurDb({
			email: user.email ?? 'default-email@bla.com',
			lastName: user.family_name ?? 'Empty Family Name',
			name: user.given_name ?? 'Empty Given Name',
		});
	}

	return (
		<html lang="en">
			<body>
				<header>
					{!isLogged && (
						<nav className="nav container">
							<h1 className="text-display-3">Cause Finder</h1>
							<div>
								<Authenticate />
							</div>
						</nav>
					)}
				</header>
				<main>{isLogged ? <NavigationAndUserInfo>{children}</NavigationAndUserInfo> : <>{children}</>}</main>
				<footer className="footer">
					<div className="container">{/* footer */}</div>
				</footer>
			</body>
		</html>
	);
}
