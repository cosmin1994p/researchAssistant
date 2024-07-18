import { TableCell, TableRow } from '@mui/material';
import React from 'react';

interface TableHeadRowProps {
	columns: string[];
}

export function TableHeadRow({ columns }: TableHeadRowProps): React.ReactNode {
	return (
		<TableRow>
			{columns.map(
				(colName: string, index: number): React.ReactNode => (
					<TableCell key={index} align="center">
						{colName}
					</TableCell>
				),
			)}
		</TableRow>
	);
}
