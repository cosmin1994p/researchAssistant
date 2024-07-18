'use client';

import React, { ChangeEvent, useMemo, useState } from 'react';
import { NavigationAndUserInfo } from '../../../components/navigation-and-user-info';
import {
	Button,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material';
import { format } from 'date-fns';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { ScientificPaper } from '../../../data/scientific-paper/types';
import { mockedPapers } from '../../../data/scientific-paper/mockData';
import Link from 'next/link';
import { TableHeadRow } from '../../../components/data-table/table-head-row';

interface ProjectParams {
	params: {
		id: number;
	};
}

const tableColumns: string[] = ['Paper Title', 'Author', 'Published Year', 'Journal Title', 'Status', 'Options'];

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
							<TableBody>
								{filteredPapers.map((paper: ScientificPaper) => (
									<TableRow hover key={paper.id}>
										<TableCell component="th" scope="row">
											{paper.title}
										</TableCell>
										<TableCell component="th" scope="row">
											{paper.author}
										</TableCell>
										<TableCell align="center">
											{format(new Date(paper.publishedYear), 'dd/MM/yyyy')}
										</TableCell>
										<TableCell align="center">{paper.journalTitle}</TableCell>
										<TableCell align="center">{paper.status}</TableCell>
										<TableCell align="center">
											<IconButton aria-label="edit">
												<EditIcon />
											</IconButton>
											<IconButton aria-label="delete" onClick={() => handleDelete(paper.id)}>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Stack>
		</NavigationAndUserInfo>
	);
}
