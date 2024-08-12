import React from 'react';
import { UploadPaperClientComponent } from '../../../../components/upload-paper';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '../../../../lib/db';

interface UploadPaperParams {
	params: {
		id: string;
	};
}

export default async function UploadPaper({ params }: UploadPaperParams) {
	const { isAuthenticated, getUser } = getKindeServerSession();
	const isLogged = await isAuthenticated();

	if (!isLogged) {
		redirect('/');
	}

	const projectId = Number(params.id); // TODO: add validation
	const currentProject = await prisma.project.findUnique({
		where: {
			id: projectId,
		},
	});

	if (!currentProject) {
		console.error(`Could not find project with the following id: ${projectId}`);
		redirect('/projects');
	}

	return <UploadPaperClientComponent projectId={projectId} projectTitle={currentProject.title} />;
}
