'use client';

import React, { ChangeEvent, useMemo, useState } from 'react';
import { NavigationAndUserInfo } from '../../../components/navigation-and-user-info';
import { Button, Paper, Stack, Table, TableContainer, TableHead, TextField } from '@mui/material';
import { ScientificPaper } from '../../../data/scientific-paper/types';
import { mockedPapers } from '../../../data/scientific-paper/mockData';
import Link from 'next/link';
import { TableHeadRow } from '../../../components/data-table/table-head-row';
import { TableBodyRows } from '../../../components/data-table/table-body-rows';

interface ProjectParams {
	params: {
		id: number;
	};
}

const tableColumns: string[] = ['Paper Title', 'Author', 'Published Year', 'Journal Title', 'Status', 'Options'];
const dataKeysOrder: string[] = ['title', 'author', 'publishedYear', 'journalTitle', 'status'];

export default function Project({ params }: ProjectParams): React.ReactNode {
	const [papers, setPapers] = useState<ScientificPaper[]>(mockedPapers);
	const [searchInput, setSearchInput] = useState('');

	const handleDelete = (id: number): void => {
		const updated = papers.filter((paper) => paper.id !== id);
		setPapers(updated);
	};

	const handleSearchChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearchInput(event.target.value);
	};

	const filteredPapers = useMemo(() => {
		return papers.filter((paper) => paper.title.toLowerCase().includes(searchInput.toLowerCase()));
	}, [searchInput, papers]);

	return (
		<NavigationAndUserInfo>
			<Stack spacing={2} alignItems="end">
				<Stack direction="row" spacing={2}>
					<Link href={`/projects/${params.id}/upload-paper`}>
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
								<TableHeadRow columns={tableColumns} />
							</TableHead>

							<TableBodyRows data={filteredPapers} onDelete={handleDelete} keysOrder={dataKeysOrder} />
						</Table>
					</TableContainer>
				</Paper>
			</Stack>
		</NavigationAndUserInfo>
	);
}
