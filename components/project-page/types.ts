export type TabDisplay = {
	label: string;
	value: string;
};

export const tabs: TabDisplay[] = [
	{
		label: 'Uploaded',
		value: 'uploaded',
	},
	{
		label: 'Processed',
		value: 'processed',
	},
	{
		label: 'Indexed',
		value: 'indexed',
	},
	{
		label: 'Summarized',
		value: 'summarized',
	},
	{
		label: 'Indexed & Summarized',
		value: 'indexed-and-summarized',
	},
	{
		label: 'All',
		value: 'all',
	},
];
