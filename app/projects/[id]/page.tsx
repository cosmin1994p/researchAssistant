import prisma from '../../../lib/db';
import { redirect } from 'next/navigation';
import { ProjectPageClientComponent } from '../../../components/project-page';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TabQueryValue } from '../../../components/project-page/types';

interface ProjectParams {
	params: {
		id: string;
	};
	searchParams: { filter: string };
}

const tableColumns: string[] = ['Paper Title', 'Author', 'Published Year', 'Journal Title', 'Status', 'Options'];
const dataKeysOrder: string[] = ['title', 'author', 'publishedYear', 'journalTitle', 'status'];

const getDataBasedOnFilter = async (filter: string, projectId: number) => {
	if (filter === TabQueryValue.All) {
		return prisma.scientificPaper.findMany({
			where: {
				projectId: projectId,
			},
		});
	}

	return prisma.scientificPaper.findMany({
		where: {
			projectId: projectId,
			status: {
				contains: filter,
			},
		},
	});
};

export default async function Project({ params, searchParams }: ProjectParams) {
	const { isAuthenticated, getUser } = getKindeServerSession();
	const isLogged = await isAuthenticated();

	if (!isLogged) {
		redirect('/');
	}

	const projectId = Number(params.id); //TODO: add parameter validation
	const { filter } = searchParams;

	const currentProject = await prisma.project.findUnique({
		where: {
			id: projectId,
		},
	});

	const projectPapers = await getDataBasedOnFilter(filter, projectId);

	if (!currentProject) {
		console.error(`Could not find project with id: ${projectId}. Malformed entry maybe.`);
		redirect('/projects');
	}

	return (
		<ProjectPageClientComponent
			data={projectPapers}
			columns={tableColumns}
			dataKeysOrder={dataKeysOrder}
			currentProjectId={projectId}
			currentProjectTitle={currentProject.title}
		/>
	);
}
