export interface ScientificPaper {
	id: number;
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
