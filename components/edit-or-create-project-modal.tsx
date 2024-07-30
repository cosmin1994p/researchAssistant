'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack, Card, CardContent, CardActions } from '@mui/material';
import { Project } from '../data/project/types';
import { createProject, updateProject } from '../api-actions/project';

interface EditOrCreateProjectModalProps {
	open: boolean;
	onClose: () => void;
	project?: Project;
}

export const EditOrCreateProjectModal = ({ open, onClose, project }: EditOrCreateProjectModalProps) => {
	const [projectName, setProjectName] = useState('');

	useEffect(() => {
		setProjectName(project ? project.title : '');
	}, [project, open]);

	const handleSave = async (): Promise<void> => {
		if (project) {
			await updateProject(projectName, project.id);
		} else {
			await createProject(projectName);
		}

		window.location.reload();
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
