import { DataType } from '../for-data-table/types';

export interface ScientificPaper extends DataType {
	title: string;
	author: string;
	publishedYear: Date;
	journalTitle: string;
	status: PaperStatus;
}

export enum PaperStatus {
	Processed = 'processed',
	Unprocessed = 'unprocessed',
	Summarized = 'summarized',
}
