import { DataType } from '../for-data-table/types';

export interface Project extends DataType {
	title: string;
	createdAt: Date;
	papersProcessed: number;
	queries: number;
}
