import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface UploadPaperButtonProps {
	currentProjectId: number;
}

export function GoToUploadPaperPageButton({ currentProjectId }: UploadPaperButtonProps) {
	return (
		<Link href={`/projects/${currentProjectId}/upload-paper`}>
			<Button variant="contained">Add papers</Button>
		</Link>
	);
}
