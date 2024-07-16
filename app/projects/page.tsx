'use client';

import React, { ChangeEvent, useMemo, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Button,
	Stack,
	TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { mockedProjects } from '../../data/project/mockData';
import { EditOrCreateProjectModal } from '../../components/edit-or-create-project-modal';
import { Project } from '../../data/project/types';
import { NavigationAndUserInfo } from '../../components/navigation-and-user-info';

export default function Projects() {
	const [projects, setProjects] = useState<Project[]>(mockedProjects);
	const [open, setOpen] = useState<boolean>(false);
	const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined);
	const [searchInput, setSearchInput] = useState('');

	const handleEditClick = (project: Project): void => {
		setCurrentProject(project);
		setOpen(true);
	};

	const handleOnCreateClick = (): void => {
		setCurrentProject(undefined);
		setOpen(true);
	};

	const handleClose = (): void => {
		setOpen(false);
		setCurrentProject(undefined);
	};

	const onSaveEdit = ({ id, title }: Project): void => {
		const updatedProjects = projects.map((p) => {
			if (p.id === id) {
				return { ...p, title };
			}
			return p;
		});
		setProjects(updatedProjects);
		handleClose();
	};

	const onSaveCreate = (project: Project): void => {
		setProjects((prev) => [...prev, project]);
	};

	const handleSaveOrEdit = (project: Project): void => {
		if (currentProject) {
			onSaveEdit(project);
		} else {
			onSaveCreate(project);
		}
	};

	const handleDelete = (id: number): void => {
		const updatedProjects = projects.filter((project) => project.id !== id);
		setProjects(updatedProjects);
	};

	const handleSearchChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearchInput(event.target.value);
	};

	const filteredProjects = useMemo(() => {
		return projects.filter((project) => project.title.toLowerCase().includes(searchInput.toLowerCase()));
	}, [searchInput, projects]);

	return (
		<NavigationAndUserInfo>
			<Stack spacing={2} alignItems="end">
				<Button variant="contained" endIcon={<AddIcon />} onClick={handleOnCreateClick}>
					Create new project
				</Button>

				<Paper sx={{ width: '100%', overflow: 'hidden' }}>
					<TextField
						fullWidth
						label="Search by Project Title"
						variant="outlined"
						value={searchInput}
						onChange={handleSearchChange}
						sx={{ m: 2, width: '25%' }}
					/>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="projects table">
							<TableHead sx={{ '& .MuiTableCell-head': { fontWeight: 'bold' } }}>
								<TableRow>
									<TableCell>Project Title</TableCell>
									<TableCell align="center">Created Date</TableCell>
									<TableCell align="center">Processed Papers</TableCell>
									<TableCell align="center">Number of Queries</TableCell>
									<TableCell align="center">Options</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredProjects.map((project) => (
									<TableRow hover key={project.id}>
										<TableCell component="th" scope="row">
											{project.title}
										</TableCell>
										<TableCell align="center">
											{format(new Date(project.createdAt), 'dd/MM/yyyy')}
										</TableCell>
										<TableCell align="center">{project.papersProcessed}</TableCell>
										<TableCell align="center">{project.queries}</TableCell>
										<TableCell align="center">
											<IconButton aria-label="edit" onClick={() => handleEditClick(project)}>
												<EditIcon />
											</IconButton>
											<IconButton aria-label="delete" onClick={() => handleDelete(project.id)}>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>

				<EditOrCreateProjectModal
					open={open}
					project={currentProject}
					onClose={handleClose}
					onSave={handleSaveOrEdit}
				/>
			</Stack>
		</NavigationAndUserInfo>
	);
}
