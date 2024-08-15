import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { DataType } from '../../data/for-data-table/types';

const columns: GridColDef[] = [
	{
		field: 'title',
		headerName: 'Paper Title',
		width: 150,
		editable: false,
		sortable: false,
		groupable: false,
	},
	{
		field: 'author',
		headerName: 'Author',
		width: 150,
		editable: false,
		sortable: false,
		groupable: false,
	},
	{
		field: 'publishedYear',
		headerName: 'Published Year',
		type: 'number',
		width: 110,
		editable: false,
		sortable: false,
		groupable: false,
	},
	{
		field: 'journalTitle',
		headerName: 'Journal Title',
		type: 'number',
		width: 110,
		editable: false,
		sortable: false,
		groupable: false,
	},
	{
		field: 'status',
		headerName: 'Status',
		type: 'number',
		width: 110,
		sortable: false,
		editable: false,
		groupable: false,
	},
];

interface GridDataType extends DataType {
	publishedYear: Date;
}

interface DataGridDemoProps {
	rows: GridDataType[];
	handleSelection: (selectionModel: GridRowSelectionModel) => void;
}

export default function DataGridDemo({ rows, handleSelection }: DataGridDemoProps) {
	const withFormattedDate = useMemo((): any[] => {
		return rows.map((row) => ({
			...row,
			publishedYear: format(row.publishedYear, 'dd/MM/yyyy'),
		}));
	}, [rows]);

	return (
		<Box>
			<DataGrid
				rows={withFormattedDate}
				columns={columns}
				checkboxSelection
				disableRowSelectionOnClick
				hideFooterPagination
				hideFooter
				onRowSelectionModelChange={handleSelection}
			/>
		</Box>
	);
}
