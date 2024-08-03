import React from 'react';
import { TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { DataType } from '../../data/for-data-table/types';

import './table-body-rows.css';
import Link from 'next/link';

interface TableBodyRowsProps {
	data: DataType[];
	keysOrder: string[];
	shouldHaveLink?: boolean;
	linkHref?: string;
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

export function TableBodyRows({
	data,
	keysOrder,
	onEdit,
	onDelete,
	shouldHaveLink = false,
	linkHref = '',
}: TableBodyRowsProps): React.ReactNode {
	return (
		<TableBody>
			{data.map(
				(item: DataType): React.ReactNode => (
					<TableRow key={item.id} className="tableRow">
						{keysOrder.map(
							(key: string): React.ReactNode =>
								key !== 'id' && (
									<TableCell key={key} align="center">
										{shouldHaveLink && (
											<Link href={`/${linkHref}/${item.id}`}>
												{stringifyDataItemValue(item[key])}
											</Link>
										)}
										{!shouldHaveLink && stringifyDataItemValue(item[key])}
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
