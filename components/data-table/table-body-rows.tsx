import React from 'react';
import { TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { DataType } from '../../data/for-data-table/types';

interface TableBodyRowsProps {
	data: DataType[];
	keysOrder: string[];
	onEdit?: (item: DataType) => void;
	onDelete?: (id: number) => void;
}

// Note: Does not work for nested structures - if value is an object.
function stringifyDataItemValue(value: unknown): string {
	if (value instanceof Date) {
		return format(value, 'dd/MM/yyyy');
	}

	return String(value);
}

export function TableBodyRows({ data, keysOrder, onEdit, onDelete }: TableBodyRowsProps): React.ReactNode {
	return (
		<TableBody>
			{data.map(
				(item: DataType): React.ReactNode => (
					<TableRow key={item.id}>
						{keysOrder.map(
							(key: string): React.ReactNode =>
								key !== 'id' && (
									<TableCell key={key} align="center">
										{stringifyDataItemValue(item[key])}
									</TableCell>
								),
						)}
						<TableCell>
							<IconButton onClick={() => onEdit?.(item)}>
								<EditIcon />
							</IconButton>
							<IconButton onClick={() => onDelete?.(item.id)}>
								<DeleteIcon />
							</IconButton>
						</TableCell>
					</TableRow>
				),
			)}
		</TableBody>
	);
}
