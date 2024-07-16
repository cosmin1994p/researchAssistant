import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Authenticate from '../components/authenticate';

export const metadata = {
	title: 'Research Assistant',
	description: 'Research Assistant, your research best buddy',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, getUser } = getKindeServerSession();
	const user = await getUser();
	return (
		<html lang="en">
			<body>
				<header>
					<nav className="nav container">
						<h1 className="text-display-3">Cause Finder</h1>
						<div>
							{!(await isAuthenticated()) ? (
								<Authenticate />
							) : (
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
							)}
						</div>
					</nav>
				</header>
				<main>{children}</main>
				<footer className="footer">
					<div className="container">{/* footer */}</div>
				</footer>
			</body>
		</html>
	);
}
