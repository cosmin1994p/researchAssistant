'use client';

import { DataType } from '../../data/for-data-table/types';
import React, { ChangeEvent, useState } from 'react';
import { ScientificPaper } from '../../data/scientific-paper/types';
import { Box, Paper, Stack, Table, TableContainer, TableHead, TextField, Typography } from '@mui/material';
import { TableHeadRow } from '../data-table/table-head-row';
import { TableBodyRows } from '../data-table/table-body-rows';
import { useDebouncedCallback } from 'use-debounce';
import { ProjectTabs } from './project-tabs';
import { TabQueryValue } from './types';
import { useSearchParams } from 'next/navigation';
import { getButtons } from './buttons';

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

	const searchParams = useSearchParams();
	const tabSearchValue = searchParams.get('filter') as TabQueryValue;

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
		<>
			<Box paddingBottom={2}>
				<Stack direction="column" spacing={2}>
					<Typography variant="h5">{currentProjectTitle}</Typography>
					<ProjectTabs />
				</Stack>
			</Box>

			<Stack spacing={2} alignItems="end">
				<Stack direction="row" spacing={2}>
					{getButtons(currentProjectId, [])[tabSearchValue]?.map((btn) => <>{btn}</>)}
				</Stack>

				<Paper sx={{ width: '100%', overflow: 'hidden' }}>
					<TextField
						fullWidth
						label="Search by Paper Title"
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
		</>
	);
}
