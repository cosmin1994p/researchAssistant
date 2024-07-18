'use client';

import React, { ChangeEvent, useMemo, useState } from 'react';
import { User } from '../../data/user/types';
import { mockedUsers } from '../../data/user/mockData';
import {
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
	Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { NavigationAndUserInfo } from '../../components/navigation-and-user-info';
import { TableHeadRow } from '../../components/data-table/table-head-row';

const tableColumns = ['Name', 'Created At', 'Processed Papers', 'Actions'];

export default function Dashboard() {
	const [users, setUsers] = useState<User[]>(mockedUsers);
	const [searchInput, setSearchInput] = useState('');

	const handleDelete = (id: number): void => {
		const updated = users.filter((user) => user.id !== id);
		setUsers(updated);
	};

	const handleSearchChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearchInput(event.target.value);
	};

	const filteredUsers = useMemo(() => {
		return users.filter((user) => user.firstName.toLowerCase().includes(searchInput.toLowerCase()));
	}, [searchInput, users]);

	return (
		<NavigationAndUserInfo>
			<Stack spacing={2} alignItems="end">
				<Paper sx={{ width: '100%', overflow: 'hidden' }}>
					<TextField
						fullWidth
						label="Search by User name"
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
								{filteredUsers.map((user: User) => (
									<TableRow hover key={user.id}>
										<TableCell component="th" scope="row">
											<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
												{user.firstName} {user.lastName}
											</Typography>
											<Typography variant="body1">{user.email}</Typography>
										</TableCell>
										<TableCell align="center">{format(new Date(), 'dd/MM/yyyy')}</TableCell>
										<TableCell align="center" component="th" scope="row">
											10
										</TableCell>
										<TableCell align="center">
											<IconButton aria-label="edit">
												<EditIcon />
											</IconButton>
											<IconButton aria-label="delete" onClick={() => handleDelete(user.id)}>
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
