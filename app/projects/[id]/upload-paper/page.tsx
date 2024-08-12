import React from 'react';
import { UploadPaperClientComponent } from '../../../../components/upload-paper';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

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

	const currentProjectId = Number(params.id); // TODO: add validation

	return <UploadPaperClientComponent currentProjectId={currentProjectId} />;
}
