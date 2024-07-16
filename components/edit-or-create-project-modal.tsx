'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack, Card, CardContent, CardActions } from '@mui/material';
import { Project } from '../data/project/types';

interface EditOrCreateProjectModalProps {
	open: boolean;
	onClose: () => void;
	project?: Project;
	onSave: (project: Project) => void;
}

export const EditOrCreateProjectModal = ({ open, onClose, project, onSave }: EditOrCreateProjectModalProps) => {
	const [projectName, setProjectName] = useState('');

	useEffect(() => {
		setProjectName(project ? project.title : '');
	}, [project, open]);

	const handleSave = () => {
		if (project) {
			onSave({
				...project,
				title: projectName,
			});
		} else {
			onSave({
				id: new Date().getMilliseconds(),
				title: projectName,
				papersProcessed: 0,
				queries: 0,
				createdAt: new Date(),
			});
		}

		onClose();
	};

	return (
		<Modal open={open} onClose={onClose} aria-labelledby="project-modal-title">
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					boxShadow: 24,
				}}
			>
				<Card>
					<CardContent>
						<Typography id="project-modal-title" variant="h6">
							{project?.id ? 'Edit Project' : 'Create New Project'}
						</Typography>
						<TextField
							fullWidth
							label="Project Name"
							variant="outlined"
							value={projectName}
							onChange={(e) => setProjectName(e.target.value)}
							margin="normal"
						/>
					</CardContent>
					<CardActions>
						<Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ width: '100%', padding: 2 }}>
							<Button onClick={onClose}>Cancel</Button>
							<Button variant="contained" onClick={handleSave}>
								{project?.id ? 'Save' : 'Create'}
							</Button>
						</Stack>
					</CardActions>
				</Card>
			</Box>
		</Modal>
	);
};
