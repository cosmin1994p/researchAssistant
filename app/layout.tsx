import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Authenticate from '../components/authenticate';
import { NavigationAndUserInfo } from '../components/navigation-and-user-info';
import React from 'react';

export const metadata = {
	title: 'Research Assistant',
	description: 'Research Assistant, your research best buddy',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, getUser } = getKindeServerSession();
	const isLogged = await isAuthenticated();

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
