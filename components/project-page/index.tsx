'use client';

import { DataType } from '../../data/for-data-table/types';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ScientificPaper } from '../../data/scientific-paper/types';
import { Box, Paper, Stack, Table, TableContainer, TableHead, TextField, Typography } from '@mui/material';
import { TableHeadRow } from '../data-table/table-head-row';
import { TableBodyRows } from '../data-table/table-body-rows';
import { useDebouncedCallback } from 'use-debounce';
import { ProjectTabs } from './project-tabs';
import { TabQueryValue } from './types';
import { useSearchParams } from 'next/navigation';
import { getButtons } from './buttons';
import DataGridDemo from './data-grid';
import { GridRowSelectionModel } from '@mui/x-data-grid';

interface ProjectPageClientComponentProps {
	data: DataType[];
	columns: string[];
	dataKeysOrder: string[];
	currentProjectId: number;
	currentProjectTitle: string;
}

export function ProjectPageClientComponent({
	data,
	currentProjectId,
	currentProjectTitle,
}: ProjectPageClientComponentProps) {
	const [searchInput, setSearchInput] = useState('');
	const [selectedPapers, setSelectedPapers] = useState<ScientificPaper[]>([]);

	const searchParams = useSearchParams();
	const tabSearchValue = searchParams.get('filter') as TabQueryValue;

	const debounceFiltering = useDebouncedCallback(async (): Promise<void> => {
		if (!searchInput) {
			window.location.reload();
			return;
		}

		// TODO: search by paper tile
	}, 300);

	const handleSearchChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearchInput(event.target.value);
		debounceFiltering();
	};

	const handleDataGridSelectionPaper = (selectionModel: GridRowSelectionModel): void => {
		const selected = data.filter((data) => selectionModel.includes(data.id)) as ScientificPaper[];
		setSelectedPapers(selected);
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
					{getButtons(currentProjectId, selectedPapers)[tabSearchValue]?.map((btn) => <>{btn}</>)}
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

					<DataGridDemo rows={data as ScientificPaper[]} handleSelection={handleDataGridSelectionPaper} />
				</Paper>
			</Stack>
		</>
	);
}
