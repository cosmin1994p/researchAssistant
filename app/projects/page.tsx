import prisma from '../../lib/db';
import { ProjectsPageClientComponent } from '../../components/projects-page';
import React from 'react';

const tableColumns: string[] = ['Project Title', 'Created Date', 'Processed Papers', 'Number of Queries', 'Options'];
const dataKeysOrder: string[] = ['title', 'createdAt', 'papersProcessed', 'queries'];

export default async function Projects() {
	const projects = await prisma.project.findMany();

	return <ProjectsPageClientComponent data={projects} columns={tableColumns} dataKeysOrder={dataKeysOrder} />;
}
