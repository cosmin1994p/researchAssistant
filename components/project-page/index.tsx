'use client';

import { DataType } from '../../data/for-data-table/types';
import React, { ChangeEvent, useState } from 'react';
import { ScientificPaper } from '../../data/scientific-paper/types';
import { Box, Button, Paper, Stack, Table, TableContainer, TableHead, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { NavigationAndUserInfo } from '../navigation-and-user-info';
import { TableHeadRow } from '../data-table/table-head-row';
import { TableBodyRows } from '../data-table/table-body-rows';
import { useDebouncedCallback } from 'use-debounce';
import { ProjectTabs } from './project-tabs';

interface ProjectPageClientComponentProps {
	data: DataType[];
	columns: string[];
	dataKeysOrder: string[];
	currentProjectId: number;
	currentProjectTitle: string;
}

export function ProjectPageClientComponent({
	data,
	columns,
	dataKeysOrder,
	currentProjectId,
	currentProjectTitle,
}: ProjectPageClientComponentProps) {
	const [papers, setPapers] = useState<ScientificPaper[]>(data as ScientificPaper[]);
	const [searchInput, setSearchInput] = useState('');

	const debounceFiltering = useDebouncedCallback(async (): Promise<void> => {
		if (!searchInput) {
			window.location.reload();
			return;
		}
	}, 300);

	const handleSearchChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearchInput(event.target.value);
		debounceFiltering();
	};

	const handleDelete = (id: number): void => {};

	return (
		<NavigationAndUserInfo>
			<Box paddingBottom={2}>
				<Stack direction="column" spacing={2}>
					<Typography variant="h5">{currentProjectTitle}</Typography>
					<ProjectTabs />
				</Stack>
			</Box>

			<Stack spacing={2} alignItems="end">
				<Stack direction="row" spacing={2}>
					<Link href={`/projects/${currentProjectId}/upload-paper`}>
						<Button variant="contained">Add papers</Button>
					</Link>
					<Button variant="contained">Automatically download papers</Button>
				</Stack>

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

							<TableBodyRows data={data} onDelete={handleDelete} keysOrder={dataKeysOrder} />
						</Table>
					</TableContainer>
				</Paper>
			</Stack>
		</NavigationAndUserInfo>
	);
}
