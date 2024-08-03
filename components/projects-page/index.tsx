'use client';

import { DataType } from '../../data/for-data-table/types';
import React, { ChangeEvent, useState } from 'react';
import { Project } from '../../data/project/types';
import { deleteProject, getFilteredProjects } from '../../api-actions/project';
import { Button, Paper, Stack, Table, TableContainer, TableHead, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TableHeadRow } from '../data-table/table-head-row';
import { TableBodyRows } from '../data-table/table-body-rows';
import { EditOrCreateProjectModal } from '../edit-or-create-project-modal';
import { NavigationAndUserInfo } from '../navigation-and-user-info';
import { useDebouncedCallback } from 'use-debounce';

interface ProjectsPageClientComponentProps {
	data: DataType[];
	columns: string[];
	dataKeysOrder: string[];
}

export function ProjectsPageClientComponent({ data, columns, dataKeysOrder }: ProjectsPageClientComponentProps) {
	const [projects, setProjects] = useState<Project[]>(data as Project[]);
	const [open, setOpen] = useState<boolean>(false);
	const [searchInput, setSearchInput] = useState('');
	const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined);

	const handleEditClick = (project: Project): void => {
		setCurrentProject(project);
		setOpen(true);
	};

	const debounceFiltering = useDebouncedCallback(async (): Promise<void> => {
		if (!searchInput) {
			window.location.reload();
			return;
		}

		const filtered = await getFilteredProjects(searchInput);
		setProjects(filtered);
	}, 300);

	const handleOnCreateClick = (): void => {
		setCurrentProject(undefined);
		setOpen(true);
	};

	const handleSearchChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearchInput(event.target.value);
		debounceFiltering();
	};

	const handleClose = (): void => {
		setOpen(false);
		setCurrentProject(undefined);
	};

	const handleDelete = async (id: number): Promise<void> => {
		await deleteProject(id);
		window.location.reload();
	};

	return (
		<NavigationAndUserInfo>
			<Typography variant="h5">Projects</Typography>

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
								<TableHeadRow columns={columns} />
							</TableHead>
							<TableBodyRows
								data={projects}
								keysOrder={dataKeysOrder}
								shouldHaveLink
								linkHref="projects"
								// @ts-ignore fuck off TS!!
								onEdit={handleEditClick}
								onDelete={handleDelete}
							/>
						</Table>
					</TableContainer>
				</Paper>

				<EditOrCreateProjectModal open={open} project={currentProject} onClose={handleClose} />
			</Stack>
		</NavigationAndUserInfo>
	);
}
