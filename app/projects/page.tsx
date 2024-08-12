import prisma from '../../lib/db';
import { ProjectsPageClientComponent } from '../../components/projects-page';
import React from 'react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

const tableColumns: string[] = ['Project Title', 'Created Date', 'Processed Papers', 'Number of Queries', 'Options'];
const dataKeysOrder: string[] = ['title', 'createdAt', 'papersProcessed', 'queries'];

export default async function Projects() {
	const { isAuthenticated, getUser } = getKindeServerSession();
	const isLogged = await isAuthenticated();
	const kindeUser = await getUser();

	if (!isLogged || !kindeUser) {
		redirect('/');
	}

	const projects = await prisma.project.findMany({
		where: {
			user: {
				email: kindeUser.email!,
			},
		},
	});

	return <ProjectsPageClientComponent data={projects} columns={tableColumns} dataKeysOrder={dataKeysOrder} />;
}
