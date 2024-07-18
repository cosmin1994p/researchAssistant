'use client';

import React, { ChangeEvent, useMemo, useState } from 'react';
import { Table, TableContainer, TableHead, Paper, Button, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { mockedProjects } from '../../data/project/mockData';
import { EditOrCreateProjectModal } from '../../components/edit-or-create-project-modal';
import { Project } from '../../data/project/types';
import { NavigationAndUserInfo } from '../../components/navigation-and-user-info';
import { TableHeadRow } from '../../components/data-table/table-head-row';
import { TableBodyRows } from '../../components/data-table/table-body-rows';

const tableColumns: string[] = ['Project Title', 'Created Date', 'Processed Papers', 'Number of Queries', 'Options'];
const dataKeysOrder: string[] = ['title', 'createdAt', 'papersProcessed', 'queries'];

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
								<TableHeadRow columns={tableColumns} />
							</TableHead>
							<TableBodyRows
								data={filteredProjects}
								keysOrder={dataKeysOrder}
								onDelete={handleDelete}
								// @ts-ignore fuck off TS!!
								onEdit={handleEditClick}
							/>
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
