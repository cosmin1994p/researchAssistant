export type TabDisplay = {
	label: string;
	value: string;
};

export enum TabQueryValue {
	Uploaded = 'uploaded',
	Processed = 'processed',
	Indexed = 'indexed',
	Summarized = 'summarized',
	IndexedAndSummarized = 'indexed-and-summarized',
	All = 'all',
}

export const tabs: TabDisplay[] = [
	{
		label: 'Uploaded',
		value: TabQueryValue.Uploaded,
	},
	{
		label: 'Processed',
		value: TabQueryValue.Processed,
	},
	{
		label: 'Indexed',
		value: TabQueryValue.Indexed,
	},
	{
		label: 'Summarized',
		value: TabQueryValue.Summarized,
	},
	{
		label: 'Indexed & Summarized',
		value: TabQueryValue.IndexedAndSummarized,
	},
	{
		label: 'All',
		value: TabQueryValue.All,
	},
];
